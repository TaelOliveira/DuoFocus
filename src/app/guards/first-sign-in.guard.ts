import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class FirstSignInGuard implements CanActivate {

  constructor(
    private storage: Storage,
    private router: Router
    ){}
    
  async canActivate(
    next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ):Promise<boolean>{

    const isSignInComplete = await this.storage.get('firstSignInComplete');

    if(!isSignInComplete){
      this.router.navigateByUrl('/profile');
    }

    return isSignInComplete;
  }
  
}
