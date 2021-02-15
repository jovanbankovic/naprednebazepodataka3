import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegkorService } from 'src/app/services/regkor.service';
import { Korisnik } from 'src/app/interfaces/korisnik';

@Component({
  selector: 'app-azurirajkorisnika',
  templateUrl: './azurirajkorisnika.component.html',
  styleUrls: ['./azurirajkorisnika.component.css']
})
export class AzurirajkorisnikaComponent implements OnInit {

  form: FormGroup;
  slikaPromenjena: boolean;
  message: string;
  korime: string;
  korisnik: Korisnik;
  image: string;

  constructor(
    private user: UserService,
    private route: ActivatedRoute,
    private regkor: RegkorService,
    private ruter: Router
    ) { }

  ngOnInit(): void {
    this.korime = localStorage.getItem("korime");
    this.regkor.dohvati_korisnika_po_korime(this.korime).subscribe((response: Korisnik) => {
      response.datum = new Date(response.datum);
      this.korisnik = response;
      this.form = new FormGroup({
        ime: new FormControl(this.korisnik.ime , { validators: [Validators.required]}),
        prezime: new FormControl(this.korisnik.prezime, { validators: [Validators.required]}),
        slika: new FormControl(this.korisnik.slikaPutanja),//, asyncValidators: [mimeType]}),
        datum: new FormControl(this.korisnik.datum, { validators: [Validators.required]}),
        grad : new FormControl(this.korisnik.grad, { validators: [Validators.required]}),
        drzava: new FormControl(this.korisnik.drzava, { validators: [Validators.required]}),
        email: new FormControl(this.korisnik.email, { validators: [Validators.required, Validators.pattern(/^\w.+@\w+\.\w+$/)]}),
      });
      this.image = this.korisnik.slikaPutanja;
      this.slikaPromenjena = false;
    }, err => {
      console.log(err);
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ slika: file });
    this.form.get("slika").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
      this.slikaPromenjena = true;
    };
    reader.readAsDataURL(file);
  }

  izmena() {
    if(this.form.invalid) {
      return;
    }
    this.user.izmena(
      this.form.value.ime,
      this.form.value.prezime,
      this.form.value.slika,
      this.form.value.datum,
      this.form.value.grad,
      this.form.value.drzava,
      this.form.value.email,
      this.slikaPromenjena,
      this.korime
    ).subscribe((response: string) => {
      this.ruter.navigate(['/korisnik/informacije']);
    }, err => {
      console.log(err);
    });
  }

}
