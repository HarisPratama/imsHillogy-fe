import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../auth/auth.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: InventoryComponent
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'transactions',
        component: TransactionComponent,
      }
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
