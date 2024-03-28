import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { selectTransactions } from 'src/app/stores/item/item.reducer';

interface PeriodicElement {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  revenue: number;
  createdAt: string;
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'quantity', 'price', 'revenue', 'date'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public store: Store,
    public transactionService: TransactionService
  ) {
    
  }

  subcription: Subscription = new Subscription();
  ELEMENT_DATA: PeriodicElement[] = [];

  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  transactions = this.store.select(selectTransactions)

  ngOnInit(): void {
    this.transactionService.getTransactions()

    const subsItems = this.transactions.subscribe((transactions) => {
      this.dataSource = new MatTableDataSource<PeriodicElement>(transactions);
    })

    this.subcription.add(subsItems)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openConfrimDialog(data: PeriodicElement) {

  }
}
