import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { selectUser, selectUsers } from 'src/app/stores/user/user.reducers';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'role', 'actions'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public store: Store,
    public userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    
  }

  role = new FormControl('')

  subcription: Subscription = new Subscription();
  ELEMENT_DATA: User[] = [];
  users = this.store.select(selectUsers)
  user = this.store.select(selectUser)

  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.userService.getUsers()

    const subUsers = this.users.subscribe((users) => {
      console.log(users);
      
      this.dataSource = new MatTableDataSource<User>(users);
    })

    this.subcription.add(subUsers)

    this.role.valueChanges.subscribe(newValue => {
      const values = newValue?.split('/')
      console.log(values);
      
      if(values?.length) this.updateRole(values[1], values[0])
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateRole(id: string, role: string) {
    this.userService.updateRoleUser({ id, role })
      .subscribe((resp) => {
        this.userService.getUsers()
        this._snackBar.open('Success update role user', 'Ok');
      }, (err) => {
        this._snackBar.open(err.message, 'Ok');
      })
  }

}
