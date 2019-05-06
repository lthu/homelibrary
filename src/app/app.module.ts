import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { DataService } from './data.service';
import { AddComponent } from './add/add.component';
import { AddAuthorComponent } from './add/addAuthor.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { ListAuthorsComponent } from './list/listAuthors.component';
import { ViewAuthorComponent } from './view/viewAuthor.component';
import { CookieService } from 'ngx-cookie-service';
import { AddGenreComponent } from './add/addGenre.component';
import { AddShelfComponent } from './add/addShelf.component';
import { ModifyComponent } from './modify/modify.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    ViewAuthorComponent,
    AddComponent,
    AddAuthorComponent,
    AddGenreComponent,
    AddShelfComponent,
    HomeComponent,
    ListComponent,
    ListAuthorsComponent,
    ModifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  exports: [],

  providers: [DataService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
