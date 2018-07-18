import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Children1Component } from './children1/children1.component';
import { Children2Component } from './children2/children2.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    Children1Component,
    Children2Component
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
