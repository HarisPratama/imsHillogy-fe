import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseGetUsers, User } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { setUser, setUsers } from '../stores/user/user.action';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private store: Store
  ) { }

  getUsers() {
    this.httpClient.get<ResponseGetUsers<User[]>>(`${environment.apiUrl}/api/users`)
      .subscribe((resp) => {
        this.store.dispatch(setUsers({payload: resp.data}))
      })
  }

  getUser() {
    this.httpClient.get<ResponseGetUsers<User>>(`${environment.apiUrl}/api/users`)
      .subscribe((resp) => {
        this.store.dispatch(setUser({payload: resp.data}))
      })
  }

  updateRoleUser(data: {id: string, role: string}) {
    return this.httpClient.put<ResponseGetUsers<User>>(`${environment.apiUrl}/api/users/${data.id}`, data)
  }
}
