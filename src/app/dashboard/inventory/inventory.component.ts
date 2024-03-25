import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AddItemComponent } from './component/dialog/add-item/add-item.component';

export interface PeriodicElement {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {quantity: 1, name: 'Hydrogen', price: 1.0079, description: 'H'},
  {quantity: 2, name: 'Helium', price: 4.0026, description: 'He'},
  {quantity: 3, name: 'Lithium', price: 6.941, description: 'Li'},
  {quantity: 4, name: 'Beryllium', price: 9.0122, description: 'Be'},
  {quantity: 5, name: 'Boron', price: 10.811, description: 'B'},
  {quantity: 6, name: 'Carbon', price: 12.0107, description: 'C'},
  {quantity: 7, name: 'Nitrogen', price: 14.0067, description: 'N'},
  {quantity: 8, name: 'Oxygen', price: 15.9994, description: 'O'},
  {quantity: 9, name: 'Fluorine', price: 18.9984, description: 'F'},
  {quantity: 10, name: 'Neon', price: 20.1797, description: 'Ne'},
  {quantity: 11, name: 'Neon', price: 20.1797, description: 'Ne'},
];

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  displayedColumns: string[] = ['position', 'name', 'description', 'quantity', 'price', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(public dialog: MatDialog) {
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(element?:PeriodicElement) {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: element ?? {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  
}
