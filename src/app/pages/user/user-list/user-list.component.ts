import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserService } from "../user.service";
import { tap, map } from "rxjs/operators";
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  users$: Observable<any>;
  columnDefs: any = {
    idx: "#",
    userName: "User Name",
    createdAt: "Created At",
    phoneNumber: "Phone No",
    userEmailId: "Email"
  };
  constructor(private us: UserService) {}

  ngOnInit() {
    this.users$ = of([]);
  }
}
