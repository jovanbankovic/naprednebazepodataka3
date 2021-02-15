import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class Guard implements CanActivate {
    
    constructor(private user:UserService, private ruter: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean 
        | import("@angular/router").UrlTree 
        | Observable<boolean 
        | import("@angular/router").UrlTree> 
        | Promise<boolean 
        | import("@angular/router").UrlTree> {
        const prijavljen = this.user.dohvati_prijavljen();
        if(!prijavljen) {
            this.ruter.navigate(["/"]);
        }
        return prijavljen;
    }
    
}