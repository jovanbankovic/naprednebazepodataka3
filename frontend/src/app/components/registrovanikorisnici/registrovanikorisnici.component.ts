import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Korisnik } from 'src/app/interfaces/korisnik';

@Component({
  selector: 'app-registrovanikorisnici',
  templateUrl: './registrovanikorisnici.component.html',
  styleUrls: ['./registrovanikorisnici.component.css']
})
export class RegistrovanikorisniciComponent implements OnInit {

  constructor(private admin: AdminService) { }

  korisnici: Korisnik[];
  displayedColumns: string[] = ['ime', 'prezime','korime', 'email', 'datum', 'drzava', 'grad', 'privilegije','potvrda'];
  //datumi: string[];

  ngOnInit(): void {
   // this.datumi = [];
    this.korisnici = [];
    this.admin.korisnici_registrovani().subscribe((data: Korisnik[]) => {
      data.forEach((korisnik,index) => {  //izbacivanje admina iz niza
        if(korisnik.korime == "admin") {
          data.splice(index, 1);
        }
      });
      this.korisnici = data;
      //this.datumi = [];
      for(let i=0; i<data.length; i++) {
        this.korisnici[i].datum = new Date(this.korisnici[i].datum);
        //const dan = this.korisnici[i].datum.getDate();
        //const mesec = this.korisnici[i].datum.getMonth() + 1;
        //const godina = this.korisnici[i].datum.getFullYear();
        //this.datumi[i] = mesec + '/' + dan + '/' + godina;
      }
    },
      err => {
        console.log(err);
      }
    );
  }

  dodeli(korisnik: Korisnik) {
    this.admin.dodeli(korisnik.korime).subscribe((response: string) => {
      console.log(response);
      this.korisnici.forEach((kor, index) => {
        if(kor.korime == korisnik.korime) {
          this.korisnici[index].privilegije = true;
        }
      });
      this.korisnici = [...this.korisnici];
    }, err => {
      console.log(err);
    });
    
  }

  oduzmi(korisnik: Korisnik) {
    this.admin.oduzmi(korisnik.korime).subscribe((response: string) => {
      console.log(response);
      this.korisnici.forEach((kor, index) => {
        if(kor.korime == korisnik.korime) {
          this.korisnici[index].privilegije = false;
        }
      });
      this.korisnici = [...this.korisnici];
    }, err => {
      console.log(err);
    });
    
  }

}
