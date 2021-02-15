import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-desavanjeprivatno',
  templateUrl: './desavanjeprivatno.component.html',
  styleUrls: ['./desavanjeprivatno.component.css']
})
export class DesavanjeprivatnoComponent implements OnInit {

  naziv: string;
  pocetak: Date;
  kraj: Date;
  opis: string;
  kreator: string;
  tip: string = "privatno";
  status: string = "neaktivno";
  pocinje_odmah: boolean = false;
  nedefinisan: boolean = false;
  praceni_form: string[] = [];

  poruka: string;

  praceni: string[];

  constructor(
    private event: EventService,
    private ruter: Router,
    private user: UserService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.kreator = localStorage.getItem("korime");
    this.user.dohvati_pracene(this.kreator).subscribe((response: any) =>{
      //console.log(response);
      this.praceni = response.following;
    }, err => {
      console.log(err);
    });
  }

  napravi() {
    //alert(this.praceni_form);
    if((this.naziv == null || this.naziv == "") || (this.pocetak == null && this.pocinje_odmah == false) || (this.opis == null || this.opis == "")
    || (this.kraj == null && this.nedefinisan == false)) {
      this.poruka = "Nisu uneseni svi podaci!"
      this.resetuj();
      this.openSnackBar();
      //alert("Nisu uneseni svi podaci!");
      return;
    }

    if(this.pocetak != null) {
      this.pocetak = new Date(this.pocetak);
    //  if(this.pocetak.getTime() < Date.now()) {
    //    console.log("Vreme pocetka nije korektno!");
    //    return;
    //  }
    }


    if(this.kraj != null) {
      this.kraj = new Date(this.kraj);
    }

    if(this.nedefinisan) {
      this.kraj = null;
    }

    if(this.pocinje_odmah) {
      this.status = "aktivno";
      this.pocetak = new Date();
    }

    if((this.pocetak != null) && (this.kraj != null) && (this.pocetak.getTime() > this.kraj.getTime())) {
      this.poruka = "Greska pri unosu podataka";
      this.resetuj();
      this.openSnackBar();
      //alert("Greska pri unosu podataka");
      return;
    }

    if((this.pocinje_odmah == false) && (this.pocetak.getTime() < Date.now())) {
      this.poruka = "Vreme pocetka je pogresno!";
      this.resetuj();
      this.openSnackBar();
      //alert("Vreme pocetka je pogresno!");
      return;
    }

    //if(this.pocetak != null )
    this.event.napravi_privatni_dogadjaj(this.naziv, this.pocetak, this.kraj, this.opis,
      this.kreator, this.tip, this.status, this.praceni_form).subscribe((response: any) => {
       // console.log(response);
        this.ruter.navigate(["/korisnik/desavanja"]);
      }, err => {
        console.log(err);
      });
  }

  openSnackBar() {
    this.snackbar.open(this.poruka, '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  resetuj() {
    //this.pocinje_odmah = false;
    //this.nedefinisan = false;
    this.status = "neaktivno";
  }

}
