import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { AdminService } from 'src/app/services/admin.service';
import { Zanr } from '../../interfaces/zanr';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dodajknjigu',
  templateUrl: './dodajknjigu.component.html',
  styleUrls: ['./dodajknjigu.component.css']
})
export class DodajknjiguComponent implements OnInit {

  form: FormGroup;
  image: string;
  zahtevPoslat: boolean;
  message: string;
  poruka: string;
  zanrovi: string[];
  korime: string;
  

  constructor(private book: BookService, private admin: AdminService, private ruter: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.korime = localStorage.getItem("korime");
    this.zanrovi = [];
    this.form = new FormGroup({
      slika: new FormControl(null),//, asyncValidators: [mimeType]}),
      naziv: new FormControl(null, { validators: [Validators.required]}),
      autori: new FormControl(null, { validators: [Validators.required]}),
      datum: new FormControl(null, { validators: [Validators.required]}),
      zanr: new FormControl(null, { validators: [Validators.required]}),
      opis: new FormControl(null, { validators: [Validators.required]}),

    });
    this.image = "assets/generic_book.jpg";
    this.zahtevPoslat = false;
    this.dohvati_zanrove();
    this.message = "";
    this.poruka = "";
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

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ slika: file });
    this.form.get("slika").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  dodaj() {
    if(this.form.invalid) {
      return;
    }
    if(this.form.value.zanr.length >3 ) {
      //this.message = "Mozete izabrati maksimalno 3 zanra";
      this.openSnackBar();
      return;
    }
    this.book.dodaj_knjigu(
      this.form.value.slika,
      this.form.value.naziv,
      this.form.value.autori,
      this.form.value.datum,
      this.form.value.zanr,
      this.form.value.opis
    ).subscribe(response => {
      console.log(response);
      this.zahtevPoslat = true;
      this.poruka = "Zahtev je uspesno poslat!";
    }, err => {
      console.log(err);
    });
  }

  dodaj_jos() {
    this.zahtevPoslat = false;
    this.poruka = "";
    this.form.reset();
    this.image = "assets/generic_book.jpg";
    if(this.korime == "admin") {
      this.ruter.navigate(["/administrator/dodaj"]);
    } else {
      this.ruter.navigate(["/korisnik/dodaj"]);
    }
    
  }

  openSnackBar() {
    this.snackbar.open("Mozete izabrati maksimalno 3 zanra!", '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
