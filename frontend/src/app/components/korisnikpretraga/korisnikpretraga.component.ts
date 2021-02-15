import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/interfaces/korisnik';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-korisnikpretraga',
  templateUrl: './korisnikpretraga.component.html',
  styleUrls: ['./korisnikpretraga.component.css']
})
export class KorisnikpretragaComponent implements OnInit {

  searchTerm1: string;
  searchTerm2: string;
  searchTerm3: string;
  searchTerm4: string;
  korisnici: Korisnik[] = [];
  izabrani_korisnici: Korisnik[] = [];

  korime: string;

  postoji: boolean = true;
  displayedColumns: string[] = ['slika', 'ime', 'prezime', 'korime', 'email', 'pristupi'];

  constructor(
    private ruter: Router,
    private admin: AdminService 
    ) { }

  ngOnInit(): void {
    this.korime = localStorage.getItem("korime");
    this.admin.korisnici_registrovani().subscribe((data: Korisnik[]) => {
      data.forEach((korisnik,index) => {  
        if(korisnik.korime == "admin") {
          data.splice(index, 1);
        }
      });
      this.korisnici = data;
      for(let i=0; i<data.length; i++) {
        this.korisnici[i].datum = new Date(this.korisnici[i].datum);
      }
    }, err => {
      console.log(err);
    })
  }

  pretraga() {
    this.izabrani_korisnici = [];
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;
    let flag4 = false;

    if(this.searchTerm1 != null && this.searchTerm1 != "") {
      //  this.postoji = true;
        flag1 = true;
        let i = 0;
        for(let j=0; j<this.korisnici.length; j++) {
          if(this.korisnici[j].ime.toLowerCase().indexOf(this.searchTerm1.toLowerCase()) !== -1) {
            this.izabrani_korisnici[i] = this.korisnici[j];
            i++;
          }
        }
        if(this.izabrani_korisnici.length > 0) {
          this.postoji = true;
        } else {
          this.postoji = false;
        }
      }

      if(this.searchTerm2 != null && this.searchTerm2 != "") {
        // this.postoji = true;
         flag2 = true;
         if(!flag1) {
           let i = 0;
           for(let j=0; j<this.korisnici.length; j++) {
            if(this.korisnici[j].prezime.toLowerCase().indexOf(this.searchTerm2.toLowerCase()) !== -1) {
              this.izabrani_korisnici[i] = this.korisnici[j];
              i++;
            }
           } 
         } else {
           let pom: Korisnik[] = [];
           let i = 0;
           for(let j=0; j<this.izabrani_korisnici.length; j++) {
              if(this.izabrani_korisnici[j].prezime.toLowerCase().indexOf(this.searchTerm2.toLowerCase()) !== -1) {
                pom[i] = this.izabrani_korisnici[j];
                i++;
              }
           }
           this.izabrani_korisnici = pom;
          }
         if(this.izabrani_korisnici.length > 0) {
           this.postoji = true;
         } else {
           this.postoji = false;
         }
        }

       if(this.searchTerm3 != null && this.searchTerm3 != "") {
        // this.postoji = true;
         flag3 = true;
         if(!flag1 && !flag2) {
           let i = 0;
           for(let j=0; j<this.korisnici.length; j++) {
            if(this.korisnici[j].korime.toLowerCase().indexOf(this.searchTerm3.toLowerCase()) !== -1) {
              this.izabrani_korisnici[i] = this.korisnici[j];
              i++;
            }
           } 
         } else {
           let pom: Korisnik[] = [];
           let i = 0;
           for(let j=0; j<this.izabrani_korisnici.length; j++) {
              if(this.izabrani_korisnici[j].korime.toLowerCase().indexOf(this.searchTerm3.toLowerCase()) !== -1) {
                pom[i] = this.izabrani_korisnici[j];
                i++;
              }
           }
           this.izabrani_korisnici = pom;
          }
         if(this.izabrani_korisnici.length > 0) {
           this.postoji = true;
         } else {
           this.postoji = false;
         }
       }

      if(this.searchTerm4 != null && this.searchTerm4 != "") {
        // this.postoji = true;
         flag4 = true;
         if(!flag1 && !flag2 && !flag3) {
           let i = 0;
           for(let j=0; j<this.korisnici.length; j++) {
            if(this.korisnici[j].email.toLowerCase().indexOf(this.searchTerm4.toLowerCase()) !== -1) {
              this.izabrani_korisnici[i] = this.korisnici[j];
              i++;
            }
           } 
         } else {
           let pom: Korisnik[] = [];
           let i = 0;
           for(let j=0; j<this.izabrani_korisnici.length; j++) {
              if(this.izabrani_korisnici[j].email.toLowerCase().indexOf(this.searchTerm4.toLowerCase()) !== -1) {
                pom[i] = this.izabrani_korisnici[j];
                i++;
              }
           }
           this.izabrani_korisnici = pom;
          }
         if(this.izabrani_korisnici.length > 0) {
           this.postoji = true;
         } else {
           this.postoji = false;
         }
       }

      
      if(!flag1 && !flag2 && !flag3 && !flag4) {
        this.postoji = false;
      } else {
        this.izabrani_korisnici.forEach((korisnik, index) => {
          if(korisnik.korime == this.korime) {
            this.izabrani_korisnici.splice(index, 1);
          }
        });
        if(this.izabrani_korisnici.length > 0) {
          this.postoji = true;
        } else {
          this.postoji = false;
        }
      }

     
       
  }

  pristupi(korisnik: Korisnik) {
    this.ruter.navigate([`korisnik/poseta/${korisnik.korime}`]);
  }

}
