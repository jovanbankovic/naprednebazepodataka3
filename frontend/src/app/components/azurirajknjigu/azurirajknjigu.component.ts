import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Knjiga } from 'src/app/interfaces/knjiga';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Zanr } from 'src/app/interfaces/zanr';

@Component({
  selector: 'app-azurirajknjigu',
  templateUrl: './azurirajknjigu.component.html',
  styleUrls: ['./azurirajknjigu.component.css']
})
export class AzurirajknjiguComponent implements OnInit {

  _id: string;
  knjiga: Knjiga = {} as Knjiga;
  zanrovi: string[] = [];
  poruka: string

  constructor(
    private book: BookService,
    private ruter: Router,
    private route: ActivatedRoute,
    private admin: AdminService
    ) { }

  ngOnInit(): void {
    
    this.poruka = "";
    this._id = this.route.snapshot.paramMap.get('id');
    this.book.dohvati_id(this._id).subscribe((data: Knjiga) => {
     // console.log(data);
      data.datum = new Date(data.datum);
      this.knjiga = data;
      this.dohvati_zanrove();
    }, err => {
      console.log(err);
    } 
      
    );
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

  azuriranje(form: NgForm) {
    if(form.invalid) {
      return;
    }
    if(this.knjiga.zanrovi.length >3 ) {
      this.poruka = "Mozete izabrati maksimalno 3 zanra";
      return;
    }
    this.book.azuriraj_knjigu(this.knjiga).subscribe( response => {
      console.log(response);  
      this.ruter.navigate(['/administrator/pregled']);
    }, err => {
      console.log(err); 
    } );
  }

}
