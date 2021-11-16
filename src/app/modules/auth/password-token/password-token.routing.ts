import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PasswordTokenComponent } from "./index/password-token.component";

const routes: Routes = [
  { path: '', component: PasswordTokenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordTokenRoutingModule {

}
