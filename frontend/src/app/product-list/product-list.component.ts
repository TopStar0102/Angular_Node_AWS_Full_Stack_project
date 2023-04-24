import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * @title Table with pagination
 */
 export interface ListData {
  _id: number;  
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit  {
  displayedColumns: string[] = ['no','name', 'description', 'price', "btn_group"];
  dataSource: MatTableDataSource<ListData> = new MatTableDataSource<ListData>([]);
  token: any = "";
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private productService: ProductsService
  ) {}

  ngAfterViewInit(): void {
    this.token = localStorage.getItem("token");
    this.getUserData();
    this.dataSource.paginator = this.paginator;
  }

  getUserData() {
    this.productService.getProducts(this.token).subscribe(
      res => {
        this.authService.isLoggedIn = true;
        this.dataSource.data = res;
      },
      err => {
        this.router.navigate(['/']);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.getUserData();
      }
    });
  }
  deleteProduct(id: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '365px',
      data: 'Are you sure you want to delete this item?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(this.token, id).subscribe(
          res => {
            if (res == "success") {
              const config: MatSnackBarConfig = {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['blue-snackbar']
              };
              this.snackBar.open("Deleted Product successfully", undefined, config);
              this.getUserData();
            }
          },
          err => {
            const config: MatSnackBarConfig = {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['blue-snackbar']
            };
            this.snackBar.open(err.error, undefined, config);
          }
        );
      }
    });
  }

  editProduct(id: any, name: string, description: string, price: any): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '400px',
      data: {id, name, description, price}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUserData();
      }
    });
  }
}
