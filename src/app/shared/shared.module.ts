import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material-module/material.module";

// PIPES

const pipes = [];

// COMPONENTS

import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderModalComponent } from "./components/loader-modal/loader-modal.component";
import { ImageUploadComponent } from "./components/img-upload/img-upload.component";
import { TableComponent } from "./components/table/table.component";
import { SearchRecordComponent } from "./components/search-record/search-record.component";

const cmps = [
  LoaderComponent,
  LoaderModalComponent,
  ImageUploadComponent,
  TableComponent,
  SearchRecordComponent
];

// DIRECTIVES

import { ClickOutsideDirective } from "./directives/click-outside.directive";

const drtvs = [ClickOutsideDirective];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [...pipes, ...cmps, ...drtvs],
  exports: [
    CommonModule,
    ...pipes,
    ...cmps,
    ...drtvs,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule {}
