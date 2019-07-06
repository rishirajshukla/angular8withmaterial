import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwt: string = localStorage.getItem("jwt");

    if (jwt) {
      req = req.clone({
        headers: new HttpHeaders({
          jwt: jwt,
          Accept: "application/json"
        })
      });
    }

    const fDataUrl1 = "";
    const fDataUrl2 = "";
    const isFormData = fDataUrl1 || fDataUrl2;

    if (isFormData) {
      return next.handle(req);
    }

    if (!req.headers.has("Content-Type")) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }
    return next.handle(req);
  }
}
