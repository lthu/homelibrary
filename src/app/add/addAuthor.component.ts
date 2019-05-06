import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add-author',
  template: `<form>
  <input type="text" name="author" placeholder="Kirjailija" [(ngModel)]="author">
  <button type="submit" (click)="submit()"> OK </button>
  <code> {{msg | json}} </code>
  </form>`,

})
export class AddAuthorComponent {
  private msg;
  private author;
  constructor(private ds: DataService) {}

  submit() {
    //this.ds.addAuthor()
    const body = { name: this.author };
    this.ds.addAuthor(this.funk.bind(this), body);
  }
  funk(res) {
    this.msg = res;
  }
}