import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CbAngularModule } from 'cb-angular';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CbAngularModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
