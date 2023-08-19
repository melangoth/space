import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LeftSidePanelComponent} from './left-side-panel/left-side-panel.component';
import {QuickStartComponent} from './quick-start/quick-start.component';
import {FreeRouteOneComponent} from './free-route-one/free-route-one.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftSidePanelComponent,
    QuickStartComponent,
    FreeRouteOneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
