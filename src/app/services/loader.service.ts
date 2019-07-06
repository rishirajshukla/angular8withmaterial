import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })

//..
export class LoaderModalService {
  private loaderModal = new Subject();
  private loaderState = new Subject();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
          // clear alert messages
          this.stopLoader();
        }
      }
    });
  }

  // output to Message Component
  getLoader(): Observable<any> {
    return this.loaderModal.asObservable();
  }

  getLoaderState(): Observable<any> {
    return this.loaderState.asObservable();
  }

  // Intake from any component that calls messagesService.message()

  startLoader(
    title: string,
    subtitle: string,
    loadingText: string = null,
    keepAfterRouteChange = false
  ) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    const loaderInfo = {
      title,
      subtitle,
      loadingText
    };
    this.loaderModal.next(loaderInfo);
  }

  changeStateandStopLoader(
    type: "success" | "error",
    msg: string,
    timeout = 500
  ) {
    this.loaderState.next({ type, msg });
    setTimeout(() => {
      this.stopLoader();
    }, timeout);
  }

  private stopLoader() {
    // clear alerts
    this.loaderModal.next();
    this.loaderState.next();
  }
}
