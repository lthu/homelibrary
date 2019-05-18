import { Component } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add-author',
  template: `
  <form>
    <input type="text" name="author" #nameElement="ngModel" placeholder="Kirjailija" [(ngModel)]="author" required>
    <button type="submit" [disabled]="!nameElement.valid" (click)="submit()">OK</button>
    <code> {{msg | json}} </code>
  </form>`,

})
export class AddAuthorComponent {
  private msg;
  private author;
  constructor(private ds: DataService) {}

  submit() {
    const body = { name: this.author };
    this.ds.addAuthor(this.callbackFunction.bind(this), body);
  }
  callbackFunction(res) {
    this.msg = res;
  }
}