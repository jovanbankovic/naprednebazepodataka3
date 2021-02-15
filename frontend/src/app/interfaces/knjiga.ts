export interface Knjiga {
    _id: string;
    slikaPutanja: string;
    naziv: string;
    autori: string[]; //moze i array[string]
    datum: Date;
    zanrovi: string[]; //promeni kasnije
    opis: string;
    prosek: number;
    odobrena: boolean;
}