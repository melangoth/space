import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LeftSidePanelComponent} from './left-side-panel/left-side-panel.component';
import {QuickStartComponent} from './quick-start/quick-start.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftSidePanelComponent,
    QuickStartComponent
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
