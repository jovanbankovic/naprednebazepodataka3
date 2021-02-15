import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-zaboravljenasifra',
  templateUrl: './zaboravljenasifra.component.html',
  styleUrls: ['./zaboravljenasifra.component.css']
})
export class ZaboravljenasifraComponent implements OnInit {

  email: string;
  poruka: string = "";
  poslato: boolean = false;

  constructor(
    private ruter: Router,
    private user: UserService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  povratak() {
    this.ruter.navigate(["/"]);
  }

  provera(form: NgForm) {
    if(form.invalid) {
      return;
    }
    //localStorage.setItem("korimepotvrda", korime); korime dobijam iz baze kad proverim da postoji email
    this.user.posalji_mail(this.email).subscribe((response: any) => {
      if(!response.postoji) {
        this.poslato = false;
        this.poruka = response.message;
        this.openSnackBar();
      } else {
        this.poruka = "";
        this.poslato = response.postoji;
        console.log(response.message);
      }
    }, err => {
      console.log(err);
    });
  }

  openSnackBar() {
    this.snackbar.open(this.poruka, '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  

}
