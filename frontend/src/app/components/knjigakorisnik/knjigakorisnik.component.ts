import { Component, OnInit } from '@angular/core';
import { Knjiga } from 'src/app/interfaces/knjiga';
import { KnjigaIzListe } from 'src/app/interfaces/knjigaizliste';
import { BookService } from 'src/app/services/book.service';
import { Komentar } from 'src/app/interfaces/komentar';
import { Router, ActivatedRoute } from '@angular/router';
import { RegkorService } from 'src/app/services/regkor.service';
import { NgForm } from '@angular/forms';
import { StringifyOptions } from 'querystring';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-knjigakorisnik',
  templateUrl: './knjigakorisnik.component.html',
  styleUrls: ['./knjigakorisnik.component.css']
})
export class KnjigakorisnikComponent implements OnInit {

  id: string;
  knjiga: Knjiga = {} as Knjiga;
  komentari: Komentar[] = [];
  stanje: string;  //da li je procitana, cita se, nalazi se na listi za citanje ili nista od toga
  korime: string;
  //knjigaizliste: KnjigaIzListe = {} as KnjigaIzListe;
  status: string;
  strana: number;
  procitano: number;
  vrednost: number; // mora pocetna vrednost
  poruka: string;

  vidljiv: boolean;
  promeni: boolean;
  uneo: boolean;

  rating: number;
  ratingArr = new Array(10);
  tekst: string;
 // ocena: number;
  

  constructor(
    private book: BookService,
    private ruter: Router,
    private route: ActivatedRoute,
    private regkor: RegkorService,
    private snackbar: MatSnackBar
   
  ) { }

  ngOnInit(): void {
    this.vidljiv = false;
    this.promeni = false;
    this.vrednost = 0;
    this.korime = localStorage.getItem("korime");
    this.id = this.route.snapshot.paramMap.get('id');
    this.regkor.dohvati_knjigu_i_komentare(this.id).subscribe((data: any) => {
       data.book.datum = new Date(data.book.datum);
       this.knjiga = data.book;
       this.komentari = data.comments;
       //console.log(data);
       //console.log(this.komentari);
       this.komentari.forEach(komentar => {
         if(komentar.korime == this.korime) {
           this.uneo = true;
           this.tekst = komentar.tekst;
           this.rating = komentar.ocena;
         }
       });
       this.knjiga_info();
     }, err => {
       console.log(err);
     }  
     );
  }

  knjiga_info() {
    this.regkor.knjiga_info(this.korime, this.knjiga.naziv, this.knjiga.autori).subscribe((data: any) => {
      if(!data.flag) {
        this.status = data.status;
        console.log(data.message);
        //console.log(data.vrednost);
      } else {
        this.status =  data.status;
        this.strana = data.strana;
        this.procitano = data.procitano;
        this.vrednost = (100*this.procitano)/this.strana;
        /*console.log(this.vrednost);
        console.log(data.strana);
        console.log(data.procitano);   */  
      }
    }, err => {
      console.log(err);
    }  
    );
  }

  povratak() {
    this.ruter.navigate(["/korisnik/pretraga"]);
  } 

  procitao() {
    this.regkor.procitao(this.korime, this.knjiga.naziv, this.knjiga.autori).subscribe((response: any) => {
      console.log(response.message);
      this.status = response.status;
      this.vrednost = 100; //mora ovo 
    }, err => {
      console.log(err);
    });
    //podesavanje uslova za ostavljanje komentara - ne treba jer se ispituje vrednost
  }

  stavi() {
    this.regkor.stavi(this.korime, this.knjiga.naziv, this.knjiga.autori).subscribe((response: any) => {
      console.log(response.message);
      this.status = response.status;
    }, err => {
      console.log(err);
    });
  }

  ukloni() {
    this.regkor.ukloni(this.korime, this.knjiga.naziv, this.knjiga.autori).subscribe((response: any) => {
      console.log(response.message);
      this.status = "ne_postoji"
    }, err => {
      console.log(err);
    });
  }

  zapocni() {
    this.regkor.zapocni(this.korime, this.knjiga.naziv, this.knjiga.autori).subscribe((response: any) => {
    //console.log(response);
     this.status = response.status;
      this.strana = response.strana;
      this.procitano = response.procitano;
    }, err => {
      console.log(err);
    });
  }

  promena() {
    this.regkor.promena(this.korime, this.knjiga.naziv, this.knjiga.autori, this.strana, this.procitano).subscribe((response: any) => {
      console.log(response.message);
      this.status = response.status;
      this.vrednost = (100*this.procitano)/this.strana;
    }, err => {
      console.log(err);
    });
    
    //alert(this.vrednost);
   // alert(this.strana);
    // kada se izjednace brojevi za procitano i strana poziva se f-ja procitao() i knjiga automatski se oznacava kao procitana
  }

  unesite_komentar() {
    if(this.vrednost < 50) {

      //alert("Ne mozete ostaviti komentar!");
      this.openSnackBar();
      this.vidljiv = false;
      return;
    }
    //PROVERA DA LI SMO VEC RANIJE UNELI KOMENTAR
   // this.poruka = "";
    //console.log(this.vrednost);
    this.vidljiv = true;
  }

  unesi(form: NgForm) {
    if(form.invalid || this.rating   == null) {
      //alert("Ne moze");
      this.vidljiv = false;
      return;
    }
    if(!this.tekst) {
      this.tekst = "";
    }
    const k = {
      korime: this.korime,
      autori: this.knjiga.autori,
      naziv: this.knjiga.naziv,
      ocena: this.rating,
      tekst: this.tekst
    }
    this.regkor.unesi_komentar(k).subscribe((response: any) => {
      console.log(response.message);
      this.komentari.push(response.comment);
      this.uneo = true;
      this.vidljiv = false;
      this.knjiga.prosek = response.prosek;
    }, err => {
      console.log(err);
    });
  }

  onClick(rating:number) {
   // console.log(rating);
    this.rating = rating;
  }
  
  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
       return 'star_border';
    }
  }

  promeni_svoj_komentar() {
    this.promeni = true;
  }

  promenikom(form: NgForm) {
    if(form.invalid) {
      this.promeni = false;
      return;
    }
    const k = {
      korime: this.korime,
      autori: this.knjiga.autori,
      naziv: this.knjiga.naziv,
      ocena: this.rating,
      tekst: this.tekst
    }
    this.regkor.promeni_svoj_komentar(k).subscribe((response: any) => {
      console.log(response.message);
      this.komentari.forEach((kom, index) => {
        if(kom.korime == this.korime) {
          this.komentari[index].tekst = this.tekst;
          this.komentari[index].ocena = this.rating;
        } 
      });
      this.promeni = false;
      this.knjiga.prosek = response.prosek;
    }, err => {
      console.log(err);
    });
  }

  korisnik(komentar: Komentar) {
    this.ruter.navigate([`korisnik/poseta/${komentar.korime}`]);
  }

  openSnackBar() {
    this.snackbar.open("Ne mozete uneti komentar!", '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
