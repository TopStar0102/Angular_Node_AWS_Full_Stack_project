import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '../service/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  form: FormGroup;
  token: any = "";
  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    private fb: FormBuilder,
    private productService: ProductsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { id: any, name: string, description: string, price: any }
  )
  {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      description: data.description,
      price: [data.price, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.token = localStorage.getItem("token");
  }
  save() {
    if (this.form.valid) {
      const name = this.form.get('name')?.value;
      const description = this.form.get('description')?.value;
      const price = this.form.get('price')?.value;
      this.productService.editProduct(this.token, this.data.id, name, description, price).subscribe(
        res => {
          console.log(res)
          if (res) {
            const config: MatSnackBarConfig = {
              duration: 2500,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            };
            this.snackBar.open("Edited the product successfully!", undefined, config);
            setTimeout(() => {
              this.dialogRef.close("success");
            }, 500);
          }
        },
        err => {
          this.dialogRef.close();
        }
      );
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
