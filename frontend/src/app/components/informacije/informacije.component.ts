import { Component, OnInit } from '@angular/core';
import { RegkorService } from 'src/app/services/regkor.service';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/interfaces/korisnik';
import { KnjigaIzListe } from 'src/app/interfaces/knjigaizliste';
import { PageEvent } from '@angular/material/paginator';
import { Komentar } from 'src/app/interfaces/komentar';

@Component({
  selector: 'app-informacije',
  templateUrl: './informacije.component.html',
  styleUrls: ['./informacije.component.css']
})
export class InformacijeComponent implements OnInit {

  id: string = "";
  korisnik: Korisnik = {} as Korisnik;

  procitano: KnjigaIzListe[];
  trenutno: KnjigaIzListe[];
  lista: KnjigaIzListe[];

  ukupno_procitane = 10;
  procitane_po_strani = 2;
  procitane_strana = 1;
  procitaneSizeOptions = [1, 2, 5, 10];

  ukupno_trenutno = 0;
  trenutno_po_strani = 2;
  trenutno_strana = 1;
  trenutnoSizeOptions = [1, 2, 5, 10];

  ukupno_lista = 0;
  lista_po_strani = 2;
  lista_strana = 1;
  listaSizeOptions = [1, 2, 5, 10];

  displayedColumns: string[] = ['naziv', 'autori','pristupi'];

  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: string = 'pie';

  praceni: Komentar[] = [];


  constructor(
    private regkor:RegkorService,
    private ruter: Router
  ) { }

  ngOnInit(): void {
    this.procitano = [];
    this.trenutno = [];
    this.lista = [];
    this.id = localStorage.getItem("korisnikId");
    this.regkor.korisnik_po_id(this.id).subscribe((data: Korisnik) => {
      data.datum = new Date(data.datum);
      this.korisnik = data;
     /* this.dohvati_procitane();
      this.dohvati_trenutno();
      this.dohvati_lista();*/
      this.dohvati_pracene();
      this.dohvati_sve_paginacija();
      this.piechart();
    }, err => {
      console.log(err);
    });
  }

  dohvati_pracene() {
    this.regkor.dohvati_pracene(this.korisnik.korime).subscribe((response: any) => {
     // console.log(response);
     this.praceni = response.array;
    }, err => {
      console.log(err);
    });
  }

  dohvati_sve_paginacija() {
    this.regkor.dohvati_sve_paginacija(this.procitane_po_strani, this.procitane_strana, this.korisnik.korime).subscribe((response: any) => {
      console.log(response.message);
      this.procitano = response.list1;
      this.ukupno_procitane = response.count1;
      this.trenutno = response.list2;
      this.ukupno_trenutno = response.count2;
      this.lista = response.list3;
      this.ukupno_lista = response.count3;
    }, err => {
      console.log(err);
    })
  }


  dohvati_procitane() {
    this.regkor.dohvati_procitane(this.procitane_po_strani, this.procitane_strana, this.korisnik.korime).subscribe((response: any) => {
      this.procitano = response.lists;
      this.ukupno_procitane = response.count;
    }, err=> {
      console.log(err);
    });
  }

  dohvati_trenutno() {
    this.regkor.dohvati_trenutno(this.trenutno_po_strani, this.trenutno_strana, this.korisnik.korime).subscribe((response: any) => {
      this.trenutno = response.lists;
      this.ukupno_trenutno = response.count;
    }, err=> {
      console.log(err);
    });
  }

  dohvati_lista() {
    this.regkor.dohvati_lista(this.lista_po_strani, this.lista_strana, this.korisnik.korime).subscribe((response: any) => {
      this.lista = response.lists;
      this.ukupno_lista = response.count;
    }, err=> {
      console.log(err);
    });
  }

  procitane_promena(pageData: PageEvent) {
    this.procitane_strana = pageData.pageIndex + 1;
    this.procitane_po_strani = pageData.pageSize;
    this.dohvati_procitane();
  }

  trenutno_promena(pageData: PageEvent) {
    this.trenutno_strana = pageData.pageIndex + 1;
    this.trenutno_po_strani = pageData.pageSize;
    this.dohvati_trenutno();
  }

  lista_promena(pageData: PageEvent) {
    this.lista_strana = pageData.pageIndex + 1;
    this.lista_po_strani = pageData.pageSize;
    this.dohvati_lista();
  }

  pristupi(element: any) {
    this.regkor.dohvati_knjiga_id(element.naziv, element.autori).subscribe((response: any) => {
      this.ruter.navigate([`korisnik/knjiga/${response.id}`]);
    }, err => {
      console.log(err);
    });
  }

  ukloni(element: any) {
    this.regkor.ukloni(this.korisnik.korime, element.naziv, element.autori).subscribe((response: any) => {
      console.log(response.message);
      this.dohvati_lista();
    }, err => {
      console.log(err);
    });
  }

  pretraga_korisnika() {
    this.ruter.navigate(["/korisnik/pretragakorisnik"]);
  }

  pretraga_knjiga() {
    this.ruter.navigate(["/korisnik/pretraga"]);
  }

  izmeni() {
    this.ruter.navigate([`/korisnik/azuriranje/${this.korisnik.korime}`]);
  }

  piechart() {
    this.regkor.piechart(this.korisnik.korime).subscribe((response: any) => {
      //console.log(response);
      let niz: any = response.array;
      if(niz.length != 0) {
        //console.log(niz);
        let brojevi = [];
        let index = 0;
        for(let i=0; i<niz.length; i++) {
          let brojac = 1;
          for(let j=i+1; j<niz.length; j++) {
            if(niz[i] == niz[j]) {
              brojac++;
              niz.splice(j, 1);
              j--;
            }
          }
          brojevi[index] = brojac;
          index++;
        }
        //console.log(niz);
       // console.log(brojevi);
       let ukupno = 0;
       for(let i=0; i<brojevi.length; i++) {
        ukupno += brojevi[i]; 
       }
       this.pieChartLabels = niz;
       for(let i=0; i<brojevi.length; i++) {
         this.pieChartData[i] = parseFloat((100*brojevi[i]/ukupno).toFixed(2));
       }
      }  
      //var counts = {};
     // niz.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
     // console.log(counts);
    }, err => {
      console.log(err);
    });
  }

}
