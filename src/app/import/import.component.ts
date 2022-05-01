import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  constructor(private router:Router, private authService:AuthServiceService) { }

  ngOnInit(): void {
  }

  fileName = '';
  file:any = null;

  onFileSelected(event:any) {
    this.file = event.target.files[0];
  }

  upload() {
    if (this.file) {
      this.fileName = this.file.name;
      const formData = new FormData();
      formData.append("file", this.file);
      console.log(formData);
      this.authService.importProjectDetails(formData).subscribe((response:any)=>{
        console.log(response);
        // this.router.navigate(['/nav']);
      }, error=>{
        console.log(error.error.message);
      });
  }
  }
}
