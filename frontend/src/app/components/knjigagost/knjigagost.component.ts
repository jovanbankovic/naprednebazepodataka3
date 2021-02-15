import { Component, OnInit } from '@angular/core';
import { Knjiga } from 'src/app/interfaces/knjiga';
import { ActivatedRoute, Router } from '@angular/router';
import { Komentar } from 'src/app/interfaces/komentar';
import { RegkorService } from 'src/app/services/regkor.service';

@Component({
  selector: 'app-knjigagost',
  templateUrl: './knjigagost.component.html',
  styleUrls: ['./knjigagost.component.css']
})
export class KnjigagostComponent implements OnInit {

  id: string;
  knjiga: Knjiga = {} as Knjiga;
  komentari: Komentar[] = [];

  constructor(
    private route: ActivatedRoute,
    private ruter: Router,
    private regkor: RegkorService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    /*this.book.dohvati_id(this.id).subscribe((data: Knjiga) => {
       data.datum = new Date(data.datum);
       this.knjiga = data;
     }, err => {
       console.log(err);
     }  
     );*/
     this.regkor.dohvati_knjigu_i_komentare(this.id).subscribe((data: any) => {
      data.book.datum = new Date(data.book.datum);
      this.knjiga = data.book;
      this.komentari = data.comments;
    }, err => {
      console.log(err);
    }  
    );

     //DOHVATANJE KOMENTARA
  }

  povratak() {
    this.ruter.navigate(["/gost/pretraga"]);
  } 

}
