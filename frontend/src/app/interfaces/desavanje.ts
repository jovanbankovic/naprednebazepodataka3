export interface Desavanje {
    _id: string,
    naziv: string,
    pocetak: Date, //neki drugi tip
    kraj: Date,
    opis: string,
    kreator: string, //korime kreatora
    tip: string,
    status: string,
    zahtevi: string[],
    ucesnici: string[],
    autori: string[],
    poruke: string[]
}   