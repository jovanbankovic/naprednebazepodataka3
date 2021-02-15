import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Knjiga } from '../interfaces/knjiga';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  dodaj_knjigu(
    slika: string,
    naziv: string,
    autori: string,
    datum: Date,
    zanr: any,  //u prvom slucaju se salje kao string a u drugom kao string[]
    opis: string
  ) {
    if(slika == null) {
      const k = {
        slikaPutanja: "assets/generic_book.jpg",
        naziv: naziv,
        autori: autori, 
        datum: datum.toString(),
        zanr: zanr,
        opis: opis
      }
      return this.http.post("http://localhost:3000/books/dodajknjigu2", k);
    }
    else {
      const postData = new FormData();
    postData.append("naziv", naziv);
    postData.append("slika", slika, naziv);
    postData.append("autori", autori);
    postData.append("datum", datum.toString());
    postData.append("zanr", zanr);
    postData.append("opis", opis);
    return this.http.post("http://localhost:3000/books/dodajknjigu1", postData);
    }
  }

  dohvati_zahteve() {
    return this.http.get("http://localhost:3000/books/zahtevi");
  }

  odobri_zahtev(_id: string) {
    return this.http.post("http://localhost:3000/books/odobri", {_id: _id});
  }

  odbaci_zahtev(_id: string) {
    return this.http.post("http://localhost:3000/books/odbaci", {_id: _id});
  }

  dohvati_sve_knjige() {
    return this.http.get("http://localhost:3000/books/sveknjige");
  }

  dohvati_odobrene_knjige() {
    return this.http.get("http://localhost:3000/books/sveodobreneknjige");
  }

  dohvati_id(_id: string) {
    return this.http.get("http://localhost:3000/books/" + _id);
  }

  azuriraj_knjigu(knjiga: Knjiga) {
    return this.http.put("http://localhost:3000/books/azuriraj", knjiga);
  }


}
