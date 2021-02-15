import { Component, OnInit } from '@angular/core';
import { Knjiga } from 'src/app/interfaces/knjiga';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregledknjiga',
  templateUrl: './pregledknjiga.component.html',
  styleUrls: ['./pregledknjiga.component.css']
})
export class PregledknjigaComponent implements OnInit {

  knjige: Knjiga[];
  displayedColumns: string[] = ['naziv', 'autori', 'datum', 'zanr', 'odobrena', 'azuriranje'];

  constructor(private book: BookService, private ruter: Router) { }

  ngOnInit(): void {
    this.knjige = [];
    this.book.dohvati_sve_knjige().subscribe((data: Knjiga[]) => {
      this.knjige = data;
      for(let i=0; i<data.length; i++) {
        this.knjige[i].datum = new Date(data[i].datum);
      }
    },  err => {
      console.log(err);
    });
  }

  azuriraj(knjiga: Knjiga) {
    this.ruter.navigate(["/administrator/azuriranje/", knjiga._id]);
  }

}
