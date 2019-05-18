import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ViewAuthorComponent } from './view/viewAuthor.component';
import { ModifyComponent } from './modify/modify.component';
import { ViewShelfComponent } from './view/viewShelf.component';


const routes: Routes = [
  { path: 'homeLibrary', component: HomeComponent },
  { path: 'homeLibrary/add', component: AddComponent },
  { path: 'homeLibrary/browse', component: ListComponent },
  { path: 'homeLibrary/view/book/:id', component: ViewComponent },
  { path: 'homeLibrary/view/author/:id', component: ViewAuthorComponent },
  { path: 'homeLibrary/view/shelf/:id', component: ViewShelfComponent },
  { path: 'homeLibrary/modify/book/:id', component: ModifyComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
