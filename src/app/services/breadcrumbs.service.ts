import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })

//..
export class BreadcrumbsService {
  private subject = new Subject();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  // output to Alerts Component
  getRouteAddress(): Observable<any> {
    return this.subject.asObservable();
  }

  // Intake from any component that calls alertService.alert()
  sendRouteAddress(route, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(route);
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}
