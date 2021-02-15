import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegkorService {

  constructor(private http: HttpClient) { }

  korisnik_po_id(id: string) {
    return this.http.get("http://localhost:3000/users/" + id);
  }

  knjiga_info(korime: string, naziv: string, autori: string[]) {
    /*const data = {
      korime: korime,
      naziv: naziv, 
      autori: autori
    }*/
   // return this.http.get("http://localhost:3000/books/" + korime + "/" + naziv + "/" + autori);
   //const queryParams = `?korime=${korime}&naziv=${naziv}&autori=${autori}`;
   return this.http.get("http://localhost:3000/books/info/" + korime + "/" + naziv + "/" + autori);
  }

  stavi(korime: string, naziv: string, autori: string[]) {
    const data = {
      korime: korime,
      naziv: naziv,
      autori: autori
    }
    return this.http.post("http://localhost:3000/books/stavi", data);
  }

  zapocni(korime: string, naziv: string, autori: string[]) {
    const data = {
      korime: korime,
      naziv: naziv,
      autori: autori
    }
    return this.http.post("http://localhost:3000/books/zapocni", data);
  }

  ukloni(korime: string, naziv: string, autori: string[]) {
    return this.http.delete("http://localhost:3000/books/ukloni/" + korime + "/" + naziv + "/" + autori);
  }

  procitao(korime: string, naziv: string, autori: string[]) {
    const data = {
      korime: korime,
      naziv: naziv,
      autori: autori
    }
    return this.http.post("http://localhost:3000/books/procitao", data);
  }

  promena(korime: string, naziv: string, autori: string[], strana: number, procitano: number) {
    const data = {
      korime: korime,
      naziv: naziv,
      autori: autori,
      strana: strana,
      procitano: procitano
    }
    return this.http.post("http://localhost:3000/books/promena", data);

  }

  unesi_komentar(k: any) {
    return this.http.post("http://localhost:3000/books/unesikom", k);
  }

  dohvati_knjigu_i_komentare(id: string) {
    return this.http.get("http://localhost:3000/books/knjigakom/" + id);
  }

  promeni_svoj_komentar(k: any) {
    return this.http.post("http://localhost:3000/books/promenikom", k);
  }

  spisak_komentara(korime: string) {
    return this.http.get("http://localhost:3000/books/spisakkom/" + korime);
  }

  dohvati_knjiga_id(naziv: string, autori: string[]) { 
    const data = {
      naziv: naziv,
      autori: autori
    }
    return this.http.post("http://localhost:3000/books/idknjige", data);
  }

  dohvati_sve_paginacija(knjige_po_strani: number, trenutna_strana: number, korime: string) {
    return this.http.get("http://localhost:3000/books/dohvatizapaginaciju/"+ korime + "/" + knjige_po_strani + "/" + trenutna_strana);
  }

  dohvati_procitane(knjige_po_strani: number, trenutna_strana: number, korime: string) {
    return this.http.get("http://localhost:3000/books/procitaneknjige/"+ korime + "/" + knjige_po_strani + "/" + trenutna_strana);
  }

  dohvati_trenutno(knjige_po_strani: number, trenutna_strana: number, korime: string) {
    return this.http.get("http://localhost:3000/books/trenutnoknjige/"+ korime + "/" + knjige_po_strani + "/" + trenutna_strana);
  }

  dohvati_lista(knjige_po_strani: number, trenutna_strana: number, korime: string) {
    return this.http.get("http://localhost:3000/books/listaknjige/"+ korime + "/" + knjige_po_strani + "/" + trenutna_strana);
  }

  dohvati_korisnika_po_korime(korime: string) {
    return this.http.get(`http://localhost:3000/users/getuser/${korime}`);
  }

  piechart(korime: string) {
    return this.http.post("http://localhost:3000/books/piechart", {korime: korime});
  }

  dohvati_pracene(korime: string) {
    return this.http.post("http://localhost:3000/books/praceni", {korime: korime});
  }
}
