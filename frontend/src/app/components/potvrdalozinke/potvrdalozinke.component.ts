import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-potvrdalozinke',
  templateUrl: './potvrdalozinke.component.html',
  styleUrls: ['./potvrdalozinke.component.css']
})
export class PotvrdalozinkeComponent implements OnInit {

  korime: string;
  poruka: string;

  constructor(
    private user: UserService,
    private route: ActivatedRoute,
    private ruter: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.korime = this.route.snapshot.paramMap.get('korime');
  }

  prijava() {
    this.ruter.navigate(["/"]);
  }

  potvrda(form: NgForm) {
    if(form.invalid) {
      return;
    }
    let lozinkaRegex = /^((?=[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&])(?=.*[A-Z]).{7,})$/;
    if(!lozinkaRegex.test(form.value.lozinka1)){
      this.poruka = "Nova lozinka je u losem formatu!";
      this.openSnackBar();
      return;
    }
    if(form.value.lozinka1 != form.value.lozinka2) {
      this.poruka = "Niste pravilno ponovili novu lozinku!";
      this.openSnackBar();
      return;
    }

    this.user.potvrdi(this.korime, form.value.lozinka1).subscribe(
      (response: string) => {
        console.log(response);
        this.user.prijava(this.korime, form.value.lozinka1);
      },
      err => { console.log(err); }
    );
  }

  openSnackBar() {
    this.snackbar.open(this.poruka, '', {
      duration: 4000,
      verticalPosition: 'top'
    });
  }

}
