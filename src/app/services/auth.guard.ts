import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { take, map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private us: UserService, private router: Router) {}
  canActivate(actRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.us.getAuth().pipe(
      take(1),
      map(state => !!state),
      tap(authenticated => {
        console.log("authenticated", authenticated);
        if (!authenticated) {
          this.router.navigateByUrl(`/auth/login?redirect=${state.url}`);
        }
      })
    );
  }
}
