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
  editID = 0;
  deleteID = 0;

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

  editForm: FormGroup = this.fb.group({
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

  openDetails(targetModal:any, project:any){
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });

    console.log(project);

    document.getElementById('projectName')?.setAttribute('value', project.project_name);
    document.getElementById('deptCode')?.setAttribute('value', project.dept_code);
    document.getElementById('users')?.setAttribute('value', project.users);
    document.getElementById('product')?.setAttribute('value', project.product);
    document.getElementById('status')?.setAttribute('value', project.status);
    document.getElementById('createdat')?.setAttribute('value', project.createdat);
    document.getElementById('updatedat')?.setAttribute('value', project.updatedat);
    document.getElementById('cieareaid')?.setAttribute('value', project.cieareaid);
    document.getElementById('financeproductid')?.setAttribute('value', project.financeproductid);
  }

  openEdit(targetModal:any, project:any){
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    // console.log(project);
    this.editForm.patchValue({
      projectName: project.project_name,
      deptCode: project.dept_code,
      users: project.users,
      product: project.product,
      statusOption: project.status,
      cieareaid: project.cieareaid,
      financeproductid: project.financeproductid,
    });

    this.editID = project.id;
    // Disabling Project Name Form Control Input to avoid changes
    // this.editForm.controls['projectName'].disable();
  }

  openDelete(targetModal:any, project:any){
    this.deleteID = project.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onSubmit(){
    if(!this.modalForm.valid) {
      return;
    }

    let projectName = this.modalForm.value.projectName;
    let deptCode = this.modalForm.value.deptCode;
    let users = "{"+ this.modalForm.value.users + "}";
    let product = this.modalForm.value.product;
    let status = this.modalForm.value.statusOption;
    let cieareaid = Number(this.modalForm.value.cieareaid);
    let financeproductid = Number(this.modalForm.value.financeproductid);
    let createdat = new Date();

    let modalValueObj = {projectName, deptCode, users, product, status, createdat, cieareaid, financeproductid};

    this.authService.addSingleProject(modalValueObj).subscribe((response:any)=>{
      console.log(response);
      this.ngOnInit();
    }, error=>{
      console.log(error.error.message);
    });

    this.modalService.dismissAll();

  }

  onSaveChanges(){
    if(!this.editForm.valid) {
      return;
    }
    // Enabling back Project Name - Form Control to fetch value
    // this.editForm.controls['projectName'].enable();

    let id = this.editID;
    let projectName = this.editForm.value.projectName;
    let deptCode = this.editForm.value.deptCode;
    let users = "{"+ this.editForm.value.users + "}";
    let product = this.editForm.value.product;
    let status = this.editForm.value.statusOption;
    let cieareaid = Number(this.editForm.value.cieareaid);
    let financeproductid = Number(this.editForm.value.financeproductid);
    let updatedat = new Date();

    let modalValueObj = {id, projectName, deptCode, users, product, status, updatedat, cieareaid, financeproductid};
    console.log(modalValueObj);
    this.authService.updateSingleProject(modalValueObj).subscribe((response:any)=>{
      console.log(response);
      this.ngOnInit();
    }, error=>{
      console.log(error.error.message);
    });

    this.modalService.dismissAll();
  }

  onDelete(){
    let deleteObj = {id:this.deleteID};
    console.log(deleteObj);
    this.authService.deleteSingleProject(deleteObj).subscribe((response:any)=>{
      console.log(response);
      this.ngOnInit();
    },error=>{
      console.log(error.error.message);
    });

    this.modalService.dismissAll();
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
