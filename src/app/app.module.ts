import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AssetsManager } from './services/assets.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
	AssetsManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
