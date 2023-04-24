import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoutComponent } from './logout/logout.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AddProductComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ConfirmationDialogComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    AppRoutingModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
