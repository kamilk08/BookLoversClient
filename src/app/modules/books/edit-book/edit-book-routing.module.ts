import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEditGuard } from './index/services/book-edit.guard';
import { EditBookComponent } from './index/edit-book.component';

const routes: Routes = [
  {
    path: '', component: EditBookComponent,
    canActivate: [BookEditGuard]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBookRoutingModule {

}
