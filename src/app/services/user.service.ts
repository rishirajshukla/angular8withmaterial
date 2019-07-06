import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  private auth = new BehaviorSubject(false);
  private employee = new BehaviorSubject(<any>null);

  constructor() {}

  // output to Auth Guard and Other Component
  getAuth(): Observable<boolean> {
    return this.auth.asObservable();
  }

  getEmployee(): Observable<any> {
    return this.employee.asObservable();
  }

  // If login is true
  updateAdminAuth(authState: boolean, employee: any) {
    console.log("user service", authState, employee);
    this.auth.next(authState);
    this.employee.next(employee);
  }
}
