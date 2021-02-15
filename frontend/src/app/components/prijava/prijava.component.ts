import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private ruter: Router, private user: UserService) { }

  korime: string;
  lozinka: string;

  ngOnInit(): void {
  }

  registracija() {
    this.ruter.navigate(['/registracija']);
  }

  gost() {
    this.ruter.navigate(['/gost']);
  }

  zaboravljena() {
    this.ruter.navigate(['/zaboravljena']);
  }

  prijava(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.user.prijava(this.korime, this.lozinka);
    // prijava korisnika  
/*
    localStorage.setItem("korime", JSON.stringify(this.korime));  //ovo ide tek na kraju login-a kada se proveri sve prethodno
    localStorage.setItem("lozinka", JSON.stringify(this.lozinka));
    if(this.korime == "admin") {
      this.ruter.navigate(['/administrator']);
    } else {
      this.ruter.navigate(['/korisnik']);
    }*/

  }
  

}
