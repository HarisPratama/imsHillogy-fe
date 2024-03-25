import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { AddItemComponent } from './inventory/component/dialog/add-item/add-item.component';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    InventoryComponent,
    DashboardComponent,
    UsersComponent,
    AddItemComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class DashboardModule { }
