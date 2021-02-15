import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Korisnik } from 'src/app/interfaces/korisnik';
import { RegkorService } from 'src/app/services/regkor.service';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit {
  
  id: string = "";
  korisnik: Korisnik = {} as Korisnik;

  constructor( private user: UserService, private regkor: RegkorService) { }

  ngOnInit(): void {  
    this.id = localStorage.getItem("korisnikId");
    this.regkor.korisnik_po_id(this.id).subscribe((data: Korisnik) => {
      this.korisnik = data;  
    }, err => {
      console.log(err);
    });
  }

  izlogujse() {
    this.user.izlogujse();
   }

  

}
