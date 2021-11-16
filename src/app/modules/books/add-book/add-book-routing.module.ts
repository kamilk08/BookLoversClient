import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './index/add-book.component';
import { AddBookGuard } from './index/services/add-book.guard';

const routes: Routes = [
  { path: '', component: AddBookComponent, canActivate: [AddBookGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBookRoutingModule {

}
