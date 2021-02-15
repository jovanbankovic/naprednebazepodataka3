import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Zanr } from 'src/app/interfaces/zanr';
import { Knjiga } from 'src/app/interfaces/knjiga';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pretragakorisnik',
  templateUrl: './pretragakorisnik.component.html',
  styleUrls: ['./pretragakorisnik.component.css']
})
export class PretragakorisnikComponent implements OnInit {

  searchTerm1: string;
  searchTerm2: string;
  searchTerm3: string;
  zanrovi: string[] = [];
  knjige: Knjiga[];
  izabrane_knjige: Knjiga[] = [];
  displayedColumns: string[] = ['slika', 'naziv', 'autori', 'datum', 'zanr', 'pristupi'];
  

  //poruka: string;
  postoji: boolean = true;   

  constructor(
    private admin:AdminService, 
    private book: BookService,
    private ruter: Router
    ) { }

  ngOnInit(): void {
    this.knjige = [];
    this.book.dohvati_sve_knjige().subscribe((data: Knjiga[]) => {
      this.knjige = data;
      for(let i=0; i<data.length; i++) {
        this.knjige[i].datum = new Date(data[i].datum);
      }
      this.dohvati_zanrove();
    },  err => {
      console.log(err);
    });
  }

  dohvati_zanrove() {
    this.admin.dohvati_zanrove().subscribe((data: Zanr[]) => {
      for(let i=0; i<data.length; i++) {
        this.zanrovi[i] = data[i].naziv;
      }
    },
      err => {
        console.log(err);
      }
    );
  }

  pretraga() {
    this.izabrane_knjige = [];
   // let i = 0;
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;

    if(this.searchTerm1 != null && this.searchTerm1 != "") {
    //  this.postoji = true;
      flag1 = true;
      let i = 0;
      for(let j=0; j<this.knjige.length; j++) {
        if(this.knjige[j].naziv.toLowerCase().indexOf(this.searchTerm1.toLowerCase()) !== -1) {
          this.izabrane_knjige[i] = this.knjige[j];
          i++;
        }
      }
      if(this.izabrane_knjige.length > 0) {
        this.postoji = true;
      } else {
        this.postoji = false;
      }
    }

    if(this.searchTerm2 != null && this.searchTerm2 != "") {
     // this.postoji = true;
      flag2 = true;
      if(!flag1) {
        let k = 0;
        for(let j=0; j<this.knjige.length; j++) {
          for(let m=0; m<this.knjige[j].autori.length; m++) {
            if(this.knjige[j].autori[m].toLowerCase().indexOf(this.searchTerm2.toLowerCase()) !== -1) {
              this.izabrane_knjige[k] = this.knjige[j];
              k++;
            }
          }
        } 
      } else {
        let pom: Knjiga[] = [];
        let l = 0;
        for(let j=0; j<this.izabrane_knjige.length; j++) {
            for(let m=0; m<this.izabrane_knjige[j].autori.length; m++) {
              if(this.izabrane_knjige[j].autori[m].toLowerCase().indexOf(this.searchTerm2.toLowerCase()) !== -1) {
                pom[l] = this.izabrane_knjige[j];
                l++
              }
            }
          }
          this.izabrane_knjige = pom;
        }
      if(this.izabrane_knjige.length > 0) {
        this.postoji = true;
      } else {
        this.postoji = false;
      }
    }

    if(this.searchTerm3 != null) {
      flag3 = true;
      if(flag1 || flag2) {
        let pom: Knjiga[] = [];
        let n = 0;
        for(let j=0; j<this.izabrane_knjige.length; j++) {
          if(this.izabrane_knjige[j].zanrovi.includes(this.searchTerm3)) {
            pom[n] = this.izabrane_knjige[j];
            n++;
          }
        }
        this.izabrane_knjige = pom;
      } else {
        let m = 0;
        for(let j=0; j<this.knjige.length; j++) {
          if(this.knjige[j].zanrovi.includes(this.searchTerm3)) {
            this.izabrane_knjige[m] = this.knjige[j];
            m++;
          }
        }
      }
      if(this.izabrane_knjige.length > 0) {
        this.postoji = true;
      } else {
        this.postoji = false;
      }
    }

    if(!flag1 && !flag2 && !flag3) {
      this.postoji = false;
    }

  }

  dodaj(){
    this.ruter.navigate(["/korisnik/dodaj"]);
  }

  pristupi(knjiga: Knjiga) {
    this.ruter.navigate(["/korisnik/knjiga/", knjiga._id]);
  }

}
