import { PipeTransform, Pipe } from '@angular/core';
import { Knjiga } from 'src/app/interfaces/knjiga';

@Pipe({
    name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {
    transform(books: Knjiga[], searchTerm1: string, searchTerm2: string, searchTerm3: string,): Knjiga[] {

        if(!searchTerm1) {
            searchTerm1 = "";
        }

        if(!searchTerm2) {
            searchTerm2 = "";
        }

        if(!searchTerm3) {
            searchTerm3 = "";
        }

        if (!books || (!searchTerm1 && !searchTerm2 && !searchTerm3)) {
            return books;
        }

        let bookf1 = books.filter(book =>
            book.naziv.toLowerCase().indexOf(searchTerm1.toLowerCase()) !== -1
            );

        let bookf2 = bookf1.filter(book => //{
            //alert(searchTerm2);
            //alert(book.autori);
           // book.autori.toString().includes(searchTerm2) //}
            book.autori.join(',').toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1
            );    

        let bookf3 = bookf2.filter(book => 
            book.zanrovi.join(',').toLowerCase().indexOf(searchTerm3.toLowerCase()) !== -1
            );

        return bookf3; 
       /* return books.filter(book =>
            book.naziv.toLowerCase().indexOf(searchTerm1.toLowerCase()) !== -1
            ||
            book.opis.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1)
            ;*/
    }
}