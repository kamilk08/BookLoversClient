import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReaderFollowersComponent } from './index/reader-followers.component';

const routes: Routes = [
  { path: ``, component: ReaderFollowersComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class ReaderFollowersRoutingModule {

}
