import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './index/manage-users.component';

const routes: Routes = [
  { component: ManageUsersComponent, path: '', canActivate: [] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddLibrarianRoutingModule {

}
