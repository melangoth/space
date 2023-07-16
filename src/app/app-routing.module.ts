import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuickStartComponent} from "./quick-start/quick-start.component";

const routes: Routes = [
  {path: '', redirectTo: '/quick-start', pathMatch: 'full'},
  {path: 'quick-start', component: QuickStartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
