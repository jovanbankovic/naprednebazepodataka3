import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  napravi_javni_dogadjaj(
    naziv: string,
    pocetak: Date,
    kraj: Date,
    opis: string,
    kreator: string,
    tip: string,
    status: string
  ) {
    const data = {
      naziv: naziv,
      pocetak: pocetak,
      kraj: kraj,
      opis: opis,
      kreator: kreator,
      tip: tip,
      status: status
    }
    return this.http.post("http://localhost:3000/events/javno", data);
  }

  napravi_privatni_dogadjaj(
    naziv: string,
    pocetak: Date,
    kraj: Date,
    opis: string,
    kreator: string,
    tip: string,
    status: string,
    praceni: string[]
  ) {    
    const data = {
      naziv: naziv,
      pocetak: pocetak,
      kraj: kraj,
      opis: opis,
      kreator: kreator,
      tip: tip,
      status: status,
      praceni: praceni
    }
    return this.http.post("http://localhost:3000/events/privatno", data);
  }

  dohvati_desavanja() {
    return this.http.get("http://localhost:3000/events/dohvatisve");
  }

  dohvati_desavanje_po_id(id: string) {
    return this.http.get("http://localhost:3000/events/" + id);
  }

  aktiviraj(_id: string) {
    return this.http.post("http://localhost:3000/events/aktiviraj", {_id: _id});
  }

  zatvori(_id: string) {
    return this.http.post("http://localhost:3000/events/zatvori", {_id: _id});
  }

  pristupi_javno(id: string, korime: string) {
    const data = {
      id: id,
      korime: korime
    }
    return this.http.post("http://localhost:3000/events/pristupijavno", data);
  }

  zahtev_privatni(id: string, korime: string) {
    const data = {
      id: id,
      korime: korime
    }
    return this.http.post("http://localhost:3000/events/zahtevprivatni", data);
  }

  prihvati(id: string, korime: string) {
    const data = {
      id: id,
      korime: korime
    }
    return this.http.post("http://localhost:3000/events/prihvati", data);
  }

  odbaci(id: string, korime: string) {
    const data = {
      id: id,
      korime: korime
    }
    return this.http.post("http://localhost:3000/events/odbaci", data);
  }

  unesi(id: string, korime: string, tekst: string) {
    const data = {
      id: id,
      korime: korime,
      tekst: tekst
    }
    return this.http.post("http://localhost:3000/events/unesi", data);
  } 

}
