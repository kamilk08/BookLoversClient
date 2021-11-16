import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorComponent } from './index/author.component';

const routes: Routes = [
  {
    path: '', component: AuthorComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class AuthorRoutingModule {

}
