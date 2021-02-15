import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { GostComponent } from './components/gost/gost.component';
import { KorisnikComponent } from './components/korisnik/korisnik.component';
import { ModeratorComponent } from './components/moderator/moderator.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { PrijavaComponent } from './components/prijava/prijava.component';
import { PromenalozinkeComponent } from './components/promenalozinke/promenalozinke.component';
import { KorisnicicekanjeComponent } from './components/korisnicicekanje/korisnicicekanje.component';
import { RegistrovanikorisniciComponent } from './components/registrovanikorisnici/registrovanikorisnici.component';
import { DodajknjiguComponent } from './components/dodajknjigu/dodajknjigu.component';
import { ZanroviComponent } from './components/zanrovi/zanrovi.component';
import { ZaboravljenasifraComponent } from './components/zaboravljenasifra/zaboravljenasifra.component';
import { OdobriknjiguComponent } from './components/odobriknjigu/odobriknjigu.component';
import { PregledknjigaComponent } from './components/pregledknjiga/pregledknjiga.component';
import { AzurirajknjiguComponent } from './components/azurirajknjigu/azurirajknjigu.component';
import { PretragagostComponent } from './components/pretragagost/pretragagost.component';
import { DesavanjagostComponent } from './components/desavanjagost/desavanjagost.component';
import { KnjigagostComponent } from './components/knjigagost/knjigagost.component';
import { Guard } from './guards/guard';
import { InformacijeComponent } from './components/informacije/informacije.component';
import { SpisakkomentaraComponent } from './components/spisakkomentara/spisakkomentara.component';
import { PretragakorisnikComponent } from './components/pretragakorisnik/pretragakorisnik.component';
import { KnjigakorisnikComponent } from './components/knjigakorisnik/knjigakorisnik.component';
import { PotvrdalozinkeComponent } from './components/potvrdalozinke/potvrdalozinke.component';
import { KorisnikposetaComponent } from './components/korisnikposeta/korisnikposeta.component';
import { KorisnikpretragaComponent } from './components/korisnikpretraga/korisnikpretraga.component';
import { AzurirajkorisnikaComponent } from './components/azurirajkorisnika/azurirajkorisnika.component';
import { DesavanjeComponent } from './components/desavanje/desavanje.component';
import { DesavanjejavnoComponent } from './components/desavanjejavno/desavanjejavno.component';
import { DesavanjeprivatnoComponent } from './components/desavanjeprivatno/desavanjeprivatno.component';
import { DesavanjaComponent } from './components/desavanja/desavanja.component';


const routes: Routes = [
  { path: '', component: PrijavaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'gost', component: GostComponent,
      children:[
        { path: 'pretraga', component: PretragagostComponent },
        { path: 'desavanja', component: DesavanjagostComponent },
        { path: 'knjiga/:id', component: KnjigagostComponent },
        { path: '', redirectTo: 'pretraga', pathMatch: 'full'}
      ]},
  { path: 'korisnik', component: KorisnikComponent,
      children: [
        { path: 'informacije', component: InformacijeComponent, canActivate: [Guard] },
        { path: 'desavanja', component: DesavanjaComponent, canActivate: [Guard] },
        { path: 'desavanje/:id', component: DesavanjeComponent, canActivate: [Guard] },
        { path: 'desavanjejavno', component: DesavanjejavnoComponent, canActivate: [Guard] },
        { path: 'desavanjeprivatno', component: DesavanjeprivatnoComponent, canActivate: [Guard] },
        { path: 'promena', component: PromenalozinkeComponent, canActivate: [Guard] },
        { path: 'spisak', component: SpisakkomentaraComponent, canActivate: [Guard] },
        { path: 'dodaj', component: DodajknjiguComponent,canActivate: [Guard] },
        { path: 'odobri', component: OdobriknjiguComponent,canActivate: [Guard] },
        { path: 'pretraga', component: PretragakorisnikComponent,canActivate: [Guard] },
        { path: 'pretragakorisnik', component: KorisnikpretragaComponent,canActivate: [Guard] },
        { path: 'knjiga/:id', component: KnjigakorisnikComponent, canActivate: [Guard] },
        { path: 'poseta/:korime', component: KorisnikposetaComponent, canActivate: [Guard] },
        { path: 'azuriranje/:korime', component: AzurirajkorisnikaComponent, canActivate: [Guard] },
        { path: '', redirectTo: 'informacije', pathMatch: 'full'}
  ]},
  { path: 'moderator', component: ModeratorComponent },
  { path: 'administrator', component: AdministratorComponent,
      children:[
        { path: 'promena', component: PromenalozinkeComponent, canActivate: [Guard] },
        { path: 'cekanje', component: KorisnicicekanjeComponent, canActivate: [Guard] },
        { path: 'registrovani', component: RegistrovanikorisniciComponent,canActivate: [Guard] },
        { path: 'dodaj', component: DodajknjiguComponent,canActivate: [Guard] },
        { path: 'odobri', component: OdobriknjiguComponent,canActivate: [Guard] },
        { path: 'zanrovi', component: ZanroviComponent, canActivate: [Guard] },
        { path: 'pregled', component: PregledknjigaComponent, canActivate: [Guard] },
        { path: 'azuriranje/:id', component: AzurirajknjiguComponent, canActivate: [Guard] },
        { path: '', redirectTo: 'cekanje', pathMatch: 'full'}
  ]},
  { path: 'zaboravljena', component: ZaboravljenasifraComponent },
  { path: 'potvrda/:korime', component: PotvrdalozinkeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [Guard]
})
export class AppRoutingModule { }
