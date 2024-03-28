import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetTransactionResponse, GetTransactionsResponse, TransactionInterface } from 'src/app/interfaces/item.interface';
import { setTransactions } from 'src/app/stores/item/item.actions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private httpClient: HttpClient,
    private store: Store
  ) { }

  getTransactions() {
    this.httpClient.get<GetTransactionsResponse>(`${environment.apiUrl}/items/transaction`)
      .subscribe((resp) => {
        this.store.dispatch(setTransactions({payload: resp.data}))
      })
  }

  postTransactions(data: TransactionInterface) {
    return this.httpClient.post<GetTransactionResponse>(`${environment.apiUrl}/items/transaction`, data)
  }

}
