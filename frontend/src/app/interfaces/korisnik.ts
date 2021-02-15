export interface Korisnik {
    ime: string;
    prezime: string;
    slikaPutanja: string; //proveri
    korime: string;
    lozinka: string;
    datum: Date;    
    grad: string;
    drzava: string;
    email: string;
    privilegije: boolean;
}