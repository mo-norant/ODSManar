import { Router } from '@angular/router';
import { OogstkaartService } from './../../oogstkaart.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-confirmdelete',
  templateUrl: './confirmdelete.component.html',
  styleUrls: ['./confirmdelete.component.scss']
})
export class ConfirmdeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private ooostkaartservice: OogstkaartService, private snackBar: MatSnackBar, private router : Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteproduct(){
    if(this.data.id){
    this.ooostkaartservice.DeleteItem(this.data.id).subscribe(res => {
      

      this.snackBar.open("Product verwijderd", "", {
        duration: 2000
      });

      this.dialogRef.close();
      
    })
    }else{
      this.dialogRef.close();

      this.snackBar.open("Product niet verwijderd", "", {
        duration: 2000
      });
    }
  }

  ngOnInit() {
  }

}
