import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AuthServiceService } from '../auth-service.service';
import { TableDataSource, TableItem } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'project_name','dept_code', 'users', 'product', 'status', 'createdat', 'cieareaid', 'financeproductid'];
  tableData = []

  constructor(private authService:AuthServiceService) {
    this.dataSource = new TableDataSource(this.tableData);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

  ngOnInit(): void {
    this.getTableData();
    this.dataSource.data = this.tableData;
  }

  getTableData(){
    this.authService.getProjectTable().subscribe((response:any)=>{
      this.tableData = response.table;
      this.dataSource.data = response.table;
      console.log(this.tableData);
      // console.log(this.dataSource.data);
      // console.log(response);
    },error=>{
      console.log(error.error.message);
    });
  }
}
