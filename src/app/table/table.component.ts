import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AuthServiceService } from '../auth-service.service';
import { TableDataSource, TableItem } from './table-datasource';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';

interface Status {
  value: boolean;
  viewValue: string;
}

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
  closeResult = "";

  statuses: Status[] = [
    {value: true, viewValue: 'Active'},
    {value: false, viewValue: 'Finished/Closed'},
  ];

  constructor(private authService:AuthServiceService, private modalService:NgbModal, private fb:FormBuilder) {
    this.dataSource = new TableDataSource(this.tableData);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;

  }

  ngOnInit(): void {
    this.getTableData();
    this.dataSource.data = this.tableData;
  }

  modalForm: FormGroup = this.fb.group({
    projectName: new FormControl('',[Validators.required]),
    deptCode: new FormControl('',[Validators.required]),
    users: new FormControl('',[Validators.required]),
    product: new FormControl('',[Validators.required]),
    statusOption: new FormControl('',Validators.required),
    cieareaid: new FormControl('',[Validators.required]),
    financeproductid: new FormControl('',[Validators.required]),

  });

  getTableData(){
    this.authService.getProjectTable().subscribe((response:any)=>{
      this.tableData = response.table;
      this.dataSource.data = response.table;
      console.log(this.tableData);
    },error=>{
      console.log(error.error.message);
    });
  }

  open(content:any){
    this.modalService.open(content, {ariaLabelledBy:'modal-basic-title'}).result.then((result)=>{
      this.closeResult = `Closed with: ${result}`;
    }, (reason)=>{
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit(){
    if(!this.modalForm.valid) {
      return;
    }

    let projectName = this.modalForm.value.projectName;
    let deptCode = this.modalForm.value.deptCode;
    let users = this.modalForm.value.users;
    let product = this.modalForm.value.product;
    let status = this.modalForm.value.statusOption;
    let cieareaid = this.modalForm.value.cieareaid;
    let financeproductid = this.modalForm.value.financeproductid;
    let createdat = new Date();

    let modalValueObj = {projectName, deptCode, users, product, status, createdat, cieareaid, financeproductid};

    this.authService.addSingleProject(modalValueObj).subscribe((response:any)=>{
      console.log(response);
    }, error=>{
      console.log(error.error.message);
    });

  }


  private getDismissReason(reason:any): string{
    if(reason===ModalDismissReasons.ESC){
      return 'by pressing ESC';
    } else if(reason===ModalDismissReasons.BACKDROP_CLICK){
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
