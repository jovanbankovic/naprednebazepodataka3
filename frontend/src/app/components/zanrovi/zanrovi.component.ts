import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Zanr } from '../../interfaces/zanr';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-zanrovi',
  templateUrl: './zanrovi.component.html',
  styleUrls: ['./zanrovi.component.css']
})
export class ZanroviComponent implements OnInit {

  displayedColumns: string[] = ['naziv', 'brisanje'];
  zanrovi: Zanr[];
  novi_zanr: string;
  forma: boolean;

  constructor(private admin: AdminService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.forma = false;
    this.zanrovi = [];
    this.novi_zanr = "";
    this.admin.dohvati_zanrove().subscribe((data: Zanr[]) => {
      this.zanrovi = data;
    },
      err => {
        console.log(err);
      }
    );
  }

  obrisi(naziv: string) {
    this.admin.obrisi_zanr(naziv).subscribe((response: any) => {
      if(response.flag) {
        this.zanrovi.forEach((zanr, index) => {
          if(zanr.naziv == naziv) {
            this.zanrovi.splice(index, 1);
          }
        });
        this.zanrovi = [...this.zanrovi]; //ponovo radi, ne znam zbog cega
      } else {
        this.openSnackBar();  
      }
      //this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

  novi() {
    this.forma = true;
  }

  dodaj(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.admin.dodaj_zanr(this.novi_zanr).subscribe((response: any) => {
      if(response.flag) {
        let novi = {
          naziv: this.novi_zanr
        }
       // console.log(novi);
        this.zanrovi.push(novi);
        this.zanrovi = [...this.zanrovi];  // radi jer je promenjena neka referenca
       // console.log(this.zanrovi.length);
        this.forma = false;
        this.novi_zanr = "";
       // this.zanrovi.splice(3,1);
      }
      //console.log(response);
      //this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

  openSnackBar() {
    this.snackbar.open("Ne moze da se izbrise zanr!", '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
