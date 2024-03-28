import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetItemsResponse, GetItemResponse, ItemInterface, GetThresholdItemResponse } from 'src/app/interfaces/item.interface';
import { setItems, setItem, setThreshold, setItemsThreshold } from 'src/app/stores/item/item.actions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private httpClient: HttpClient,
    private store: Store
  ) { }

  getItems() {
    this.httpClient.get<GetItemsResponse>(`${environment.apiUrl}/items`)
      .subscribe((resp) => {
        this.store.dispatch(setItems({payload: resp.data}))
      })
  }

  getItem(id: string) {
    this.httpClient.get<GetItemResponse>(`${environment.apiUrl}/items/${id}`)
      .subscribe((resp) => {
        this.store.dispatch(setItem({payload: resp.data}))
      })
  }

  postItem(data: ItemInterface) {
    return this.httpClient.post<GetItemResponse>(`${environment.apiUrl}/items`, data)
  }

  putItem(data: ItemInterface) {
    return this.httpClient.put<GetItemResponse>(`${environment.apiUrl}/items/${data._id}`, data)
  }

  deleteItem(id: string) {
    return this.httpClient.delete<GetItemResponse>(`${environment.apiUrl}/items/${id}`)
  }

  getThreshold() {
    this.httpClient.get<GetThresholdItemResponse>(`${environment.apiUrl}/items/threshold`)
      .subscribe((resp) => {
        this.store.dispatch(setThreshold({payload: resp.data.value}))
      })
  }

  getItemThreshold() {
    this.httpClient.get<GetItemsResponse>(`${environment.apiUrl}/items/item-threshold`)
      .subscribe((resp) => {
        this.store.dispatch(setItemsThreshold({payload: resp.data}))
      })
  }

  putItemThreshold(data: { value: number }) {
    return this.httpClient.post<GetItemResponse>(`${environment.apiUrl}/items/threshold`, data)
  }
}
