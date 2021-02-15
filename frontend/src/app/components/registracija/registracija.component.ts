import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  form: FormGroup;
  image: string;
  zahtevPoslat: boolean;
  message: string;
  recaptcha: any[];

  constructor(private ruter: Router, private user: UserService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      ime: new FormControl(null, { validators: [Validators.required]}),
      prezime: new FormControl(null, { validators: [Validators.required]}),
      slika: new FormControl(null),
      korime: new FormControl(null, { validators: [Validators.required]}),
      lozinka1: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^((?=[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&])(?=.*[A-Z]).{7,})$/)]}),
      lozinka2: new FormControl(null, { validators: [Validators.required]}),
      datum: new FormControl(null, { validators: [Validators.required]}),
      grad : new FormControl(null, { validators: [Validators.required]}),
      drzava: new FormControl(null, { validators: [Validators.required]}),
      email: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^\w.+@\w+\.\w+$/)]}),
    });
    this.image = "assets/generic_person.jpg";
    this.zahtevPoslat = false;
  }

  prijava() {
    this.zahtevPoslat = false;
    this.ruter.navigate(['']);
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

  registracija() {
    if(this.form.invalid || (this.form.value.lozinka1 != this.form.value.lozinka2)) { 
      return;
    }
    if(this.recaptcha == null) {
      //alert("Dokazite da niste robot!");
      this.openSnackBar();
      return;
    }
    this.user.registracija(
      this.form.value.ime,
      this.form.value.prezime,
      this.form.value.slika,
      this.form.value.korime,
      this.form.value.lozinka1,
      this.form.value.datum,
      this.form.value.grad,
      this.form.value.drzava,
      this.form.value.email,
    ).subscribe((response: string) => {
      console.log(response);
      this.message = "Zahtev je poslat administratoru!";
      this.zahtevPoslat = true;
    }, err => {
      console.log(err);
    }); //MORA OVDE SUBSCRIBE
   // this.message = "Registracija je uspesna! Sacejate da administrator odobri Vas zahtev";
    //this.zahtevPoslat = true;
  }

  resolved(captchaResponse: any[]) {
    this.recaptcha = captchaResponse;
    //console.log(this.recaptcha);
  }

  openSnackBar() {
    this.snackbar.open("Dokazite da niste robot!", '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
