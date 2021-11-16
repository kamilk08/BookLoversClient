import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookComponent } from './index/book.component';

export const routes: Routes = [
  {
    path: '', component: BookComponent,
    canActivate: []
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {

}
