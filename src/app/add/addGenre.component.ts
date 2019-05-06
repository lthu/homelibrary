import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add-genre',
  template: `<form>
  <input type="text" name="genre" placeholder="Tyylilaji" [(ngModel)]="genre">
  <button type="submit" (click)="submit()"> OK </button>
  <code> {{msg | json}} </code>
  </form>`,

})
export class AddGenreComponent {
  private msg;
  private genre;
  constructor(private ds: DataService) {}

  submit() {
    const body = { name: this.genre };
    this.ds.addGenre(this.funk.bind(this), body);
  }
  funk(res) {
    this.msg = res;
  }
}
