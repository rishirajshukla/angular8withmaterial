import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTable } from "@angular/material";
import {
  NamemyTableDataSource,
  NamemyTableItem
} from "./namemy-table-datasource";

@Component({
  selector: "app-namemy-table",
  templateUrl: "./namemy-table.component.html",
  styleUrls: ["./namemy-table.component.css"]
})
export class NamemyTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<NamemyTableItem>;
  dataSource: NamemyTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["id", "name"];

  ngOnInit() {
    this.dataSource = new NamemyTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
