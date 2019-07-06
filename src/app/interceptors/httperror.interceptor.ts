import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private us: UserService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errMsg = "";
        // Client Side Error
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.error.message}`;
        } else if (error.status === 401) {
          // Server Side Error
          errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          if (error.error.meta.action === "logout") {
            this.us.updateAdminAuth(false, null);
            localStorage.clear();
            this.router.navigateByUrl("/auth/login");
          }
        }
        return throwError(errMsg);
      })
    );
  }
}
