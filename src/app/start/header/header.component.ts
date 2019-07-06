import { Component, OnInit } from "@angular/core";
import { BreadcrumbsService } from "../../services/breadcrumbs.service";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  route: string;
  employee: any;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private bs: BreadcrumbsService,
    private breakpointObserver: BreakpointObserver,
    private us: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.us.getEmployee().subscribe(data => (this.employee = data));
    this.bs.getRouteAddress().subscribe(x => {
      this.route = x;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/auth/login");
  }
}
