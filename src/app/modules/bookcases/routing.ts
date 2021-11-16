import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookcaseComponent } from './index/bookcase.component';
import { BookcaseGuard } from './index/bookcase.guard';

const routes: Routes = [
  {
    path: 'bookcase/reader/:id', component: BookcaseComponent,
    canActivate: [BookcaseGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookcaseRoutingModule {

}
