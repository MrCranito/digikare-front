import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectUser } from "../store/selectors/users.selector";

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {}

  canActivate(
  ): boolean {
    let isLogged = false
    this.store.select(selectUser).subscribe(
      user => {
        if (user) {
          isLogged = true
        } else {
          this.router.navigate(['/login'])
        }
      }
    )

    return isLogged;
  }
}