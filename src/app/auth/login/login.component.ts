import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";

interface ConnectEmployees {
  email: string;
  name: string;
  adminId: string;
  typeOfAdmin: string;
  jwt: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  redirect: any;
  constructor(
    private fb: FormBuilder,

    private router: Router,
    private userSrv: UserService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.redirect = params["redirect"];
    });
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  login(body) {
    const x = {
      email: "rishi",
      name: "rishi",
      adminId: "rishi",
      typeOfAdmin: "rishi",
      jwt: "rishi"
    };
    this.afterLogin(x);
    this.router.navigateByUrl("/dashboard");
  }

  afterLogin(user) {
    this.setLocalStorage(user);
    this.userSrv.updateAdminAuth(true, user);
    this.router.navigateByUrl(this.redirect);
  }

  setLocalStorage(user: ConnectEmployees) {
    localStorage.setItem("email", user.email);
    localStorage.setItem("name", user.name);
    localStorage.setItem("adminId", user.adminId);
    localStorage.setItem("typeOfAdmin", user.typeOfAdmin);
    localStorage.setItem("jwt", user.jwt);
  }
}
