import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add-shelf',
  template: `
  <form>
    <input type="text" name="shelf" placeholder="Hylly" #nameElement="ngModel" [(ngModel)]="shelf" required>
    <button type="submit" [disabled]="!nameElement.valid" (click)="submit()">OK</button>
    <code> {{msg | json}} </code>
  </form>`,

})
export class AddShelfComponent {
  private msg;
  private shelf;
  constructor(private ds: DataService) {}

  submit() {
    const body = { name: this.shelf };
    this.ds.addShelf(this.callbackFunction.bind(this), body);
  }
  callbackFunction(res) {
    this.msg = res;
  }
}
