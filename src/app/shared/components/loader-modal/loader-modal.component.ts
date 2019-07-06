import { Component, OnInit, Input } from "@angular/core";
import { LoaderModalService } from "./../../../services/loader.service";

@Component({
  selector: "app-loader-modal",
  templateUrl: "loader-modal.component.html",
  styleUrls: ["./loader-modal.component.css"]
})
export class LoaderModalComponent implements OnInit {
  showLoader = false;
  loader: {
    title: string;
    subtitle: string;
    loadingText: string;
  };
  loaderState: "success" | "error";
  msg: string;
  constructor(private loaderSrv: LoaderModalService) {}

  ngOnInit() {
    this.loaderSrv.getLoader().subscribe(loader => {
      if (!loader) {
        // clear messages when an empty msg is received
        this.loader = null;
        this.showLoader = false;
        return;
      }
      // add msg to array
      this.loader = loader;
      this.showLoader = true;
    });
    this.loaderSrv.getLoaderState().subscribe(state => {
      if (!state) {
        this.loaderState = null;
        return;
      }
      this.loaderState = state.type;
      this.msg = state.msg;
    });
  }

  // func run inside HTML interpolation
  cssClass(msg) {
    if (!msg) {
      return;
    }

    // return css class based on msg type
    switch (msg.type) {
      case "success":
        return "success a-slide-y";
      case "error":
        return "error a-slide-y";
      case "info":
        return "info a-slide-y";
      case "warning":
        return "warning a-slide-y";
    }
  }
}
