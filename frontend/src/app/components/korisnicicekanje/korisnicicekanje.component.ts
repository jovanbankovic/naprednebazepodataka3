import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/interfaces/korisnik';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-korisnicicekanje',
  templateUrl: './korisnicicekanje.component.html',
  styleUrls: ['./korisnicicekanje.component.css']
})
export class KorisnicicekanjeComponent implements OnInit {

  korisnici: Korisnik[];
  displayedColumns: string[] = ['ime', 'prezime','korime', 'email', 'datum', 'drzava', 'grad','potvrda'];
  //datumi: string[];

  constructor(private admin: AdminService) { }

  ngOnInit(): void {
    this.korisnici = [];
    this.admin.korisnici_neregistrovani().subscribe((data: Korisnik[]) => {
      /*data.forEach((korisnik,index) => {
        if(korisnik.korime == "admin") {
          data.splice(index, 1);
        }
      });*/ //ne treba uopse jer se admin i ne dohvata
      this.korisnici = data;
      for(let i=0; i<data.length; i++) {
        this.korisnici[i].datum = new Date(data[i].datum);
      //  const dan = this.korisnici[i].datum.getDate();
        //const mesec = this.korisnici[i].datum.getMonth() + 1;
        //const godina = this.korisnici[i].datum.getFullYear();
      //  this.datumi[i] = mesec + '/' + dan + '/' + godina;
      }
    },
      err => {
        console.log(err);
      }
    );
  }

  potvrdi(korisnik: Korisnik) {
    this.admin.potvrdi(korisnik.korime).subscribe((response: string) => {
      console.log(response);
      this.korisnici.forEach((kor, index) => {
        if(kor.korime == korisnik.korime) {
          this.korisnici.splice(index, 1);
        }
      });
      this.korisnici = [...this.korisnici];
      //this.ngOnInit();
    }, err => {
      console.log(err);
    });
    
  }

  odbaci(korisnik: Korisnik) {
    this.admin.odbaci(korisnik.korime).subscribe((response: string) => {
      console.log(response);
      this.korisnici.forEach((kor, index) => {
        if(kor.korime == korisnik.korime) {
          this.korisnici.splice(index, 1);
        }
      });
      this.korisnici = [...this.korisnici];
      //this.ngOnInit();
    }, err => {
      console.log(err);
    });
    
  }

}
