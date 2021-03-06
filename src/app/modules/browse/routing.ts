import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './index/browse/browse.component';

export const routes: Routes = [
  { path: "", component: BrowseComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowseRoutingModule {

}
