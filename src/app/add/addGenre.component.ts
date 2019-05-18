import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add-genre',
  template: `
  <form>
    <input type="text" name="genre" #nameElement="ngModel" placeholder="Tyylilaji" [(ngModel)]="genre" required>
    <button type="submit" [disabled]="!nameElement.valid" (click)="submit()">OK</button>
    <code> {{msg | json}} </code>
  </form>`,

})
export class AddGenreComponent {
  private msg;
  private genre;
  constructor(private ds: DataService) {}

  submit() {
    const body = { name: this.genre };
    this.ds.addGenre(this.callbackFunction.bind(this), body);
    console.log(body);
  }
  callbackFunction(res) {
    this.msg = res;
  }
}
