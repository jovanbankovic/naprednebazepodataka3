import { Component, OnInit } from '@angular/core';
import { Desavanje } from 'src/app/interfaces/desavanje';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-desavanjagost',
  templateUrl: './desavanjagost.component.html',
  styleUrls: ['./desavanjagost.component.css']
})
export class DesavanjagostComponent implements OnInit {

  desavanja: Desavanje[] = [];
  displayedColumns: string[] = ['naziv', 'aktivno'];

  constructor(
    private event: EventService
  ) { }

  ngOnInit(): void {
    this.event.dohvati_desavanja().subscribe((response: any) => {
       response.events.forEach(event => {
         event.pocetak = new Date(event.pocetak);
         if(event.kraj != null) {
           event.kraj = new Date(event.kraj);
           if(event.kraj.getTime() < Date.now()) {
             event.status = "zavrseno";
           }
         }
         
         if((event.pocetak.getTime() < Date.now()) && (event.status != "zavrseno") && (event.status != "zatvoreno")) {
           event.status = "aktivno"
         }
         if(((event.status == "aktivno") || (Date.now() < event.pocetak.getTime())) && (event.tip == "javno")) {
           this.desavanja.push(event);
         }
       });
      // this.desavanja = response.events;
     }, err => {
       console.log(err);
     });
  }

}
