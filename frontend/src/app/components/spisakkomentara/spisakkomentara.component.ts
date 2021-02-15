import { Component, OnInit } from '@angular/core';
import { Komentar } from 'src/app/interfaces/komentar';
import { RegkorService } from 'src/app/services/regkor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spisakkomentara',
  templateUrl: './spisakkomentara.component.html',
  styleUrls: ['./spisakkomentara.component.css']
})
export class SpisakkomentaraComponent implements OnInit {

  korime: string;
  komentari: Komentar[] = [];
  displayedColumns: string[] = ['naziv', 'autori','ocena', 'komentar'];

  constructor(
    private regkor: RegkorService,
    private ruter: Router
    ) { }

  ngOnInit(): void {
    this.korime = localStorage.getItem("korime");
    this.regkor.spisak_komentara(this.korime).subscribe((response: any) => {
      //console.log(response);
      this.komentari = response.comments;
    }, err => {
      console.log(err);
    })
  }

  knjiga(komentar: Komentar) {
    this.regkor.dohvati_knjiga_id(komentar.naziv, komentar.autori).subscribe((response: any) => {
      this.ruter.navigate([`korisnik/knjiga/${response.id}`]);
    }, err => {
      console.log(err);
    });
  }

}
