import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { Desavanje } from 'src/app/interfaces/desavanje';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-desavanje',
  templateUrl: './desavanje.component.html',
  styleUrls: ['./desavanje.component.css']
})
export class DesavanjeComponent implements OnInit {

  id: string;
  korime: string;
  desavanje: Desavanje = {} as Desavanje;
  ucestvuje: boolean = false;
  zahtev_poslat: boolean = false;
  niz: Desavanje[] = [];

  vidljiv: boolean = false;
  tekst: string;

  displayedColumns: string[] = ['naziv', 'pocetak','kraj', 'kreator', 'tip', 'ucesnici', 'status','opis', 'dugmad'];
  displayedColumns2: string[] = ['korime', 'dugmad'];

  constructor(
    private event: EventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.korime = localStorage.getItem("korime");
    this.event.dohvati_desavanje_po_id(this.id).subscribe((response: Desavanje) => {
      this.desavanje = response;
      this.desavanje.pocetak = new Date(this.desavanje.pocetak);
      if(this.desavanje.kraj != null) {
        this.desavanje.kraj = new Date(this.desavanje.kraj);
      }
      this.niz.push(this.desavanje);
      if(this.desavanje.ucesnici.includes(this.korime)) {
        this.ucestvuje = true;
      }
      if(this.desavanje.zahtevi.includes(this.korime)) {
        this.zahtev_poslat = true;
      }
    }, err => {
      console.log(err);
    });
  }

  aktiviraj() {
    if(this.desavanje.kraj != null) {
      if(this.desavanje.kraj.getTime() < Date.now()) {
        this.desavanje.status = "zavrseno";
        this.niz[0].status = "zavrseno";
        return;
      }
    }
    this.event.aktiviraj(this.id).subscribe((response: string) => {
      this.desavanje.status = "aktivno";
      this.niz[0].status = "aktivno";
    }, err => {
      console.log(err);
    });
  }

  zatvori() {
    if(this.desavanje.kraj != null) {
      if(this.desavanje.kraj.getTime() < Date.now()) {
        this.desavanje.status = "zavrseno";
        this.niz[0].status = "zavrseno";
        return;
      }
    }
    this.event.zatvori(this.id).subscribe((response: string) => {
      this.desavanje.status = "zatvoreno";
      this.niz[0].status = "zatvoreno";
    }, err => {
      console.log(err);
    });
  }

  zahtev_privatni() {
    if(this.desavanje.kraj != null) {
      if(this.desavanje.kraj.getTime() < Date.now()) {
        this.desavanje.status = "zavrseno";
        this.niz[0].status = "zavrseno";
        return;
      }
    }
    this.event.zahtev_privatni(this.id, this.korime).subscribe((response: any) => {
      this.zahtev_poslat = true;
      this.desavanje.zahtevi = response.zahtevi;
     // this.niz[0].ucesnici = response.ucesnici;
    }, err => {
      console.log(err);
    });
  }

  pristupi_javno() {
    if(this.desavanje.kraj != null) {
      if(this.desavanje.kraj.getTime() < Date.now()) {
        this.desavanje.status = "zavrseno";
        this.niz[0].status = "zavrseno";
        return;
      }
    }
    this.event.pristupi_javno(this.id, this.korime).subscribe((response: any) => {
      //console.log(this.niz[0].ucesnici);
      //console.log(response);
      this.ucestvuje = true;
      this.desavanje.ucesnici = response.ucesnici;
      this.niz[0].ucesnici = response.ucesnici;
      //console.log(this.niz);
      //console.log(this.niz);
     
     // alert(this.niz[0].ucesnici);
     // console.log(this.niz);
      //this.niz = [...this.niz];
    }, err => {
      console.log(err);
    });
  }

  prihvati(korime: string) {
    if(this.desavanje.kraj != null) {
      if(this.desavanje.kraj.getTime() < Date.now()) {
        this.desavanje.status = "zavrseno";
        this.niz[0].status = "zavrseno";
        return;
      }
    }
    this.event.prihvati(this.id, korime).subscribe((response: any) => {
      this.desavanje.ucesnici = response.ucesnici;
      this.desavanje.zahtevi = response.zahtevi;
    }, err => {
      console.log(err);
    });
  }

  odbaci(korime: string) {
    if(this.desavanje.kraj != null) {
      if(this.desavanje.kraj.getTime() < Date.now()) {
        this.desavanje.status = "zavrseno";
        this.niz[0].status = "zavrseno";
        return;
      }
    }
    this.event.odbaci(this.id, korime).subscribe((response: any) => {
      this.desavanje.zahtevi = response.zahtevi;
    }, err => {
      console.log(err);
    });
  }

  unesite_komentar() {
    if(this.desavanje.kraj != null) {
      if(this.desavanje.kraj.getTime() < Date.now()) {
        this.desavanje.status = "zavrseno";
        this.niz[0].status = "zavrseno";
        return;
      }
    }
    this.vidljiv = true;
  }

  unesi(form: NgForm) {
    if(this.desavanje.kraj != null) {
      if(this.desavanje.kraj.getTime() < Date.now()) {
        this.desavanje.status = "zavrseno";
        this.niz[0].status = "zavrseno";
        return;
      }
    }
    //na kraju ide vidljiv = false;
    if(!this.tekst || this.tekst == "") {
      alert("Morate uneti tekst!");
      return;
    }
    this.event.unesi(this.id, this.korime, this.tekst).subscribe((response: any) => {
      this.desavanje.autori = response.autori;
      this.desavanje.poruke = response.poruke;
      this.vidljiv = false;
      this.tekst = "";
    }, err => {
      console.log(err);
    });
  }
 
}
