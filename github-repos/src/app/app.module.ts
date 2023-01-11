import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoadingComponent } from './loading/loading.component';
@NgModule({
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [AppComponent, SearchComponent, UserDetailsComponent, LoadingComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
