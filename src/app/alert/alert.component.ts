import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  hide: boolean = false;
  btnClr: boolean = false;

  ngOnInit(): void {

  }

  toggleClr(clr:boolean){
    this.btnClr = clr;
  }

  toggleHide(hide:boolean){
    this.hide = hide;
  }




}
