import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-desavanjejavno',
  templateUrl: './desavanjejavno.component.html',
  styleUrls: ['./desavanjejavno.component.css']
})
export class DesavanjejavnoComponent implements OnInit {

  naziv: string;
  pocetak: Date;
  kraj: Date;
  opis: string;
  kreator: string;
  tip: string = "javno";
  status: string = "neaktivno";
  pocinje_odmah: boolean = false;
  nedefinisan: boolean = false;

  poruka: string;

  constructor(
    private event: EventService,
    private ruter: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.kreator = localStorage.getItem("korime");
  }

  napravi() {
    //provera da li su svi podaci popunjeni
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
    this.event.napravi_javni_dogadjaj(this.naziv, this.pocetak, this.kraj, this.opis,
      this.kreator, this.tip, this.status).subscribe((response: any) => {
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
