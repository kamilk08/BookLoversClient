import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyAccountComponent } from './index/verify-account.component';

const routes: Routes = [
  {
    path: "", component: VerifyAccountComponent,
    canActivate: []
  }
]

@NgModule({
  declarations:[],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteRegistrationRouting {

}
