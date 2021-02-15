import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Korisnik } from 'src/app/interfaces/korisnik';
import { RegkorService } from 'src/app/services/regkor.service';
import { report } from 'process';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-promenalozinke',
  templateUrl: './promenalozinke.component.html',
  styleUrls: ['./promenalozinke.component.css']
})
export class PromenalozinkeComponent implements OnInit {

  //korime: string;
  //lozinka: string;
  stara_lozinka: string;
  nova_lozinka1: string;
  nova_lozinka2: string;
  poruka: string;
  korisnik: Korisnik = {} as Korisnik;
  id: string;

  constructor(
    private user: UserService,
    private regkor: RegkorService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("korisnikId");
    this.regkor.korisnik_po_id(this.id).subscribe((data: Korisnik) => {
      this.korisnik = data;
    }, err => {
      console.log(err);
    });
    /*this.korime = JSON.parse(localStorage.getItem("korime"));
    this.lozinka = JSON.parse(localStorage.getItem("lozinka"));*/
    this.poruka = "";
  }

  promeni(form: NgForm) {
    if(form.invalid) {
      return;
    }
    /*if(this.stara_lozinka != this.lozinka) {
      this.poruka = "Stara lozinka nije dobra!";
      return;
    }*/
    let lozinkaRegex = /^((?=[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&])(?=.*[A-Z]).{7,})$/;
    if(!lozinkaRegex.test(this.nova_lozinka1)){
      this.poruka = "Nova lozinka je u losem formatu!";
      this.openSnackBar();
      return;
    }
    if(this.stara_lozinka == this.nova_lozinka1) {
      this.poruka = "Nova lozinka je ista kao stara!";
      this.openSnackBar();
      return;
    }
    if(this.nova_lozinka1 != this.nova_lozinka2) {
      this.poruka = "Niste pravilno ponovili novu lozinku!";
      this.openSnackBar();
      return;
    }
    this.user.promeni(this.korisnik.korime, this.stara_lozinka, this.nova_lozinka1).subscribe(
      (response: any) => {
        if(response.flag) {
          console.log(response.message);
          this.poruka = "";
          this.user.izlogujse();
        }
        else {
          this.poruka = response.message;
          this.openSnackBar();
        }
      },
      err => { console.log(err); }
    );
  }

  openSnackBar() {
    this.snackbar.open(this.poruka, '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
