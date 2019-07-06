import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "./services/user.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  redirect;
  constructor(private userSrv: UserService, private actRoute: ActivatedRoute) {}
  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.redirect = params["redirect"];
    });
    const allReadyLoggedIn = localStorage.getItem("email");
    if (allReadyLoggedIn) {
      const user = this.getLocalStorage();
      this.afterLogin(user);
    }
  }

  getLocalStorage() {
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const adminId = localStorage.getItem("adminId");
    const typeOfAdmin = localStorage.getItem("typeOfAdmin");
    const user = {
      email,
      name,
      adminId,
      typeOfAdmin
    };
    return user;
  }

  getlocalTokens() {
    const jwt = localStorage.getItem("jwt");
    const tokens = {
      jwt
    };
    return tokens;
  }

  afterLogin(user) {
    this.userSrv.updateAdminAuth(true, user);
  }
}
