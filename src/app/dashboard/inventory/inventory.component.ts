import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { ItemService } from 'src/app/services/item/item.service';
import { selectItems, selectThreshold, selectitemThreshold } from 'src/app/stores/item/item.reducer';
import { ConfirmComponent } from 'src/app/components/dialog/confirm/confirm.component';
import { SetThresholdComponent } from './component/dialog/set-threshold/set-threshold.component';
import { Subscription, take } from 'rxjs';
import { WarnComponent } from 'src/app/components/dialog/warn/warn.component';

export interface PeriodicElement {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'description', 'quantity', 'price', 'actions'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(
    public dialog: MatDialog,
    public store: Store,
    public itemService: ItemService
  ) {
    
  }

  subcription: Subscription = new Subscription();
  ELEMENT_DATA: PeriodicElement[] = [];
  items = this.store.select(selectItems)
  threshold = this.store.select(selectThreshold)
  itemThreshold = this.store.select(selectitemThreshold)

  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);


  ngOnInit(): void {
    this.itemService.getItems()
    this.itemService.getThreshold()
    this.itemService.getItemThreshold()

    const subsItems = this.items.subscribe((items) => {
      this.dataSource = new MatTableDataSource<PeriodicElement>(items);
    })

    this.subcription.add(subsItems)

    const subThreshold = this.subcription = this.itemThreshold.pipe(take(1)).subscribe((resp) => {
      if (resp.length > 0) {
        this.dialog.open(WarnComponent, {
          data: {
            title: 'Warning',
            desc: 'there are items that have reached the threshold'
          }
        })
      }
    })

    this.subcription.add(subThreshold)
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(element?:PeriodicElement, type?: string) {
    let payload: any = {
      data: element
    }
    if (type && type?.length > 0) {
      payload = {
        data: {
          ...payload.data,
          type
        }
      }
    }
    const dialogRef = this.dialog.open(AddItemComponent, payload);

    this.dialogAfterClosed(dialogRef);
  }

  openConfrimDialog(element: PeriodicElement) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        onClick: () => {
          this.itemService.deleteItem(element._id ?? '')
            .subscribe((resp) => {
              this.itemService.getItems()
            })
        },
        title: 'Are you sure ?',
        desc: 'Want to delete this item'
      }
    })

    this.dialogAfterClosed(dialogRef);
  }

  openDialogThreshold() {
    this.subcription = this.threshold
      .subscribe((resp) => {
        const dialogRef = this.dialog.open(SetThresholdComponent, {
          data: {
            threshold: resp
          }
        })
        this.dialogAfterClosed(dialogRef);
      })

    this.subcription.unsubscribe()
  }

  dialogAfterClosed(dialogRef: any) {
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  
}
