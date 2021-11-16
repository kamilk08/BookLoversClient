import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuotesComponent } from "./index/quotes.component";

let routes: Routes = [
  { path: '', component: QuotesComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesRouterModule {

}
