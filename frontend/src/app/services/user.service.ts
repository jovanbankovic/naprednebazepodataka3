import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: string;
  private tokenTimer: any;
  private korisnikId: string;
  private prijavljen = false;

  constructor(private http: HttpClient, private ruter: Router, private snackbar: MatSnackBar ) { }

  getToken() {
    return this.token;
  }

  dohvati_prijavljen() {
    return this.prijavljen;
  }

  registracija(
    ime: string,
    prezime: string,
    slika: File, // any
    korime: string,
    lozinka: string,
    datum: Date,
    grad: string,
    drzava: string,
    email: string
  ) {
    if(slika == null) {
      const k = {
        ime: ime,
        prezime: prezime,
        slikaPutanja: "assets/generic_person.jpg",
        korime: korime,
        lozinka: lozinka,
        datum: datum.toString(),
        grad: grad,
        drzava: drzava,
        email: email,
        privilegije: false
      }
      return this.http.post("http://localhost:3000/users/register2", k);
    }
    else {
      const postData = new FormData();
      postData.append("ime", ime);
      postData.append("prezime", prezime);
      postData.append("slika", slika, korime);
      postData.append("korime", korime);
      postData.append("lozinka", lozinka);
      postData.append("datum", datum.toString());
      postData.append("grad", grad);
      postData.append("drzava", drzava);
      postData.append("email", email);
      return this.http.post("http://localhost:3000/users/register1", postData);
    }
  }

  izmena(
    ime: string,
    prezime: string,
    slika: any,
    datum: Date,
    grad: string,
    drzava: string,
    email: string,
    promenjena: boolean,
    korime: string
  ) {
    if(promenjena) {
      const postData = new FormData();
      postData.append("ime", ime);
      postData.append("prezime", prezime);
      postData.append("slika", slika, korime);
      postData.append("korime", korime);
      postData.append("datum", datum.toString());
      postData.append("grad", grad);
      postData.append("drzava", drzava);
      postData.append("email", email);
      return this.http.post("http://localhost:3000/users/izmena1", postData);
    }
    else {
      const k = {
        ime: ime,
        prezime: prezime,
        slikaPutanja: slika,
        korime: korime,
        datum: datum.toString(),
        grad: grad,
        drzava: drzava,
        email: email,
      }
      return this.http.post("http://localhost:3000/users/izmena2", k);
    }
  }

  prijava(korime: string, lozinka: string) {
    const korisnik = {
      korime: korime, 
      lozinka: lozinka
    };
    this.http.post<{ token: string; expiresIn: number, userId: string, message: string }>("http://localhost:3000/users/login", korisnik).subscribe(data => {
      this.token = data.token;
      if(data.token) {
        const vreme_trajanja_tokena = data.expiresIn;
        this.podesiTimer(vreme_trajanja_tokena);
        this.korisnikId = data.userId;
        this.prijavljen = true;
        const trenutno_vreme = new Date();
        const datumIsteka = new Date(trenutno_vreme.getTime() + vreme_trajanja_tokena * 1000);
        localStorage.setItem("token", this.token);
        localStorage.setItem("datumIsteka", datumIsteka.toISOString());
        localStorage.setItem("korisnikId", this.korisnikId);
        localStorage.setItem("korime", korime);
        //ide ovo za poslednji put prijavljen
        this.poslednji_put_postavi(korime);
        if(korime == "admin") {
          this.ruter.navigate(["/administrator"]);
        }
        else {
          this.ruter.navigate(["/korisnik"]);
        }
      } else {
        //alert(data.message);
        this.openSnackBar(data.message);
      }
    });
  }

  refresovanje() {
    const informacije = this.dohvati_info();
    if(!informacije) {
      return;
    }
    const trenutno_vreme = new Date();
    const ostalo = informacije.datumIsteka.getTime() - trenutno_vreme.getTime();
    if(ostalo > 0) {
      this.token = informacije.token;
      this.prijavljen = true;
      this.korisnikId = informacije.korisnikId;
      this.podesiTimer(ostalo / 1000);  
    }
  }

  podesiTimer(trajanje: number) {  //trajanje je u sekundama
    //console.log("Postavi timer: " + trajanje);
    this.tokenTimer = setTimeout(() => {
      this.izlogujse();
    }, trajanje * 1000);
  }

  dohvati_info() {
    const token = localStorage.getItem("token");
    const datumIsteka = localStorage.getItem("datumIsteka");
    const korisnikId = localStorage.getItem("korisnikId");
    if (!token || !datumIsteka) {
      return;
    }
    return {
      token: token,
      datumIsteka: new Date(datumIsteka),
      korisnikId: korisnikId
    }
  }

  izlogujse() {
    //dodatni kod
    this.korisnikId = null;
    this.token = null;
    this.prijavljen = false;
    clearTimeout(this.tokenTimer);
    localStorage.removeItem("token");
    localStorage.removeItem("datumIsteka");
    localStorage.removeItem("korisnikId");
    localStorage.removeItem("korime");
    this.ruter.navigate(['/']);
  }

  promeni(korime: string, stara_lozinka, nova_lozinka: string) {
    const korisnik = {
      korime: korime,
      stara_lozinka: stara_lozinka,
      nova_lozinka: nova_lozinka
    }
    return this.http.post("http://localhost:3000/users/promeni", korisnik);
  }

  posalji_mail(email: string) {
    return this.http.post("http://localhost:3000/users/sendmail", {email: email});
  }

  potvrdi(korime: string, lozinka: string) {
    const korisnik = {
      korime: korime,
      lozinka: lozinka
    }
    return this.http.post("http://localhost:3000/users/potvrdilozinku", korisnik);
  }

  poslednji_put_postavi(korime: string) {
    const data = {
      korime: korime,
      datum: new Date(Date.now())
    }
    this.http.post("http://localhost:3000/users/lasttime", data).subscribe((response: string) =>{
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  poslednji_put_dohvati(korime: string, prijavljen: string) {
    return this.http.get("http://localhost:3000/users/lasttimeget/" + korime + "/" + prijavljen);
  }

  zaprati(pratilac: string, praceni: string) {
    const data = {
      pratilac: pratilac,
      praceni: praceni
    }
    return this.http.post("http://localhost:3000/users/zaprati", data);
  }

  otprati(pratilac: string, praceni: string) {
    const data = {
      pratilac: pratilac,
      praceni: praceni
    }
    return this.http.post("http://localhost:3000/users/otprati", data);
  }

  dohvati_pracene(korime: string) {
    return this.http.get("http://localhost:3000/users/dohvatipracene/" + korime);
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
