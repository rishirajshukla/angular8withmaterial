import { Component, ViewChild, Input, OnChanges } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-table",
  styleUrls: ["./table.component.css"],
  templateUrl: "./table.component.html"
})
export class TableComponent implements OnChanges {
  @Input() columnDefs: any;
  @Input() rowData: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: any;
  objectKeys = Object.keys;

  constructor() {}

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.rowData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
