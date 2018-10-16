import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatChipsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatIconModule,
  MatSnackBarModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { AppRoutingModule } from './app-routing.module';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [AppComponent, SearchbarComponent, MainPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
