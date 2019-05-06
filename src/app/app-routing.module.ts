import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ViewAuthorComponent } from './view/viewAuthor.component';
import { ModifyComponent } from './modify/modify.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddComponent },
  { path: 'browse', component: ListComponent },
  { path: 'view/book/:id', component: ViewComponent },
  { path: 'view/author/:id', component: ViewAuthorComponent },
  { path: 'modify/book/:id', component: ModifyComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
