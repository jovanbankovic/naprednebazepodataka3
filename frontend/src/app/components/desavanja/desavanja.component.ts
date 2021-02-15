import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/interfaces/korisnik';
import { Desavanje } from 'src/app/interfaces/desavanje';
import { Router } from '@angular/router';
import { RegkorService } from 'src/app/services/regkor.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-desavanja',
  templateUrl: './desavanja.component.html',
  styleUrls: ['./desavanja.component.css']
})
export class DesavanjaComponent implements OnInit {

  korisnik: Korisnik = {} as Korisnik;
  desavanja: Desavanje[] = [];

  displayedColumns: string[] = ['naziv', 'kreator', 'tip', 'pristupi'];

  constructor(
    private ruter: Router,
    private regkor: RegkorService,
    private event: EventService
  ) { }

  ngOnInit(): void {
    this.dohvati_korisnika();
    this.dohvati_desavanja();
  }

  dohvati_korisnika() {
    let korime = localStorage.getItem("korime");
    this.regkor.dohvati_korisnika_po_korime(korime).subscribe((data: Korisnik) => {
      this.korisnik = data;
    }, err => {
      console.log(err);
    });
  }

  dohvati_desavanja() {
    this.event.dohvati_desavanja().subscribe((response: any) => {
     // console.log(response.message);
      response.events.forEach(event => {
        event.pocetak = new Date(event.pocetak);
        if(event.kraj != null) {
          event.kraj = new Date(event.kraj);
        }
      });
      this.desavanja = response.events;
     /* this.desavanja.forEach(desavanje => {
        if(desavanje.kraj.getTime() == desavanje.pocetak.getTime()) {
          desavanje.kraj = null;
        }
      });*/
      //provera da li je desavanje pocelo ili se zavrsilo i azuriranje
    }, err => {
      console.log(err);
    });
  }

  desavanje_privatno() {
    this.ruter.navigate(["/korisnik/desavanjeprivatno"]);
  }

  desavanje_javno() {
    this.ruter.navigate(["/korisnik/desavanjejavno"]);
  }

  pristupi(desavanje: Desavanje) {
    this.ruter.navigate(["/korisnik/desavanje/", desavanje._id]);
  }


}
