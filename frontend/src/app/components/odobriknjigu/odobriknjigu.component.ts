import { Component, OnInit } from '@angular/core';
import { Knjiga } from 'src/app/interfaces/knjiga';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-odobriknjigu',
  templateUrl: './odobriknjigu.component.html',
  styleUrls: ['./odobriknjigu.component.css']
})
export class OdobriknjiguComponent implements OnInit {

  knjige: Knjiga[];
  displayedColumns: string[] = ['naziv', 'autori', 'datum', 'zanr', 'odobrena', 'odobravanje'];
  //datumi: string[];

  constructor(private book: BookService) { }

  ngOnInit(): void {
    //this.datumi = [];
    this.knjige = [];
    this.book.dohvati_zahteve().subscribe((data: Knjiga[]) => {
      this.knjige = data;
      for(let i=0; i<data.length; i++) {
        this.knjige[i].datum = new Date(data[i].datum);
      //  const dan = this.knjige[i].datum.getDate();
        //const mesec = this.knjige[i].datum.getMonth() + 1;
        //const godina = this.knjige[i].datum.getFullYear();
        //this.datumi[i] = mesec + '/' + dan + '/' + godina;
      }
    },  err => {
      console.log(err);
    });
  }

  odobri(knjiga: Knjiga) {
    this.book.odobri_zahtev(knjiga._id).subscribe((response: string) => {
      console.log(response);
      this.knjige.forEach((k, index) => {
        if(k._id == knjiga._id) {
          this.knjige.splice(index, 1);
        }
      });
      this.knjige = [...this.knjige];
      //this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

  odbaci(knjiga: Knjiga) {
    this.book.odbaci_zahtev(knjiga._id).subscribe((response: string) => {
      console.log(response);
      this.knjige.forEach((k, index) => {
        if(k._id == knjiga._id) {
          this.knjige.splice(index, 1);
        }
      });
      this.knjige = [...this.knjige];
      //this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

}
