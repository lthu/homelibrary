import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add-shelf',
  template: `<form>
  <input type="text" name="shelf" placeholder="Hylly" [(ngModel)]="shelf">
  <button type="submit" (click)="submit()"> OK </button>
  <code> {{msg | json}} </code>
  </form>`,

})
export class AddShelfComponent {
  private msg;
  private shelf;
  constructor(private ds: DataService) {}

  submit() {
    const body = { name: this.shelf };
    this.ds.addShelf(this.funk.bind(this), body);
  }
  funk(res) {
    this.msg = res;
  }
}
