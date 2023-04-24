import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '../service/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  token: any = "";

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private productService: ProductsService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: '',
      price: ['', [Validators.required, Validators.min(0)]]
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
      this.productService.addProduct(this.token, name, description, price).subscribe(
        res => {
          console.log(res)
          if (res) {
            const config: MatSnackBarConfig = {
              duration: 2500,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            };
            this.snackBar.open("Added Product successfully!", undefined, config);
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
