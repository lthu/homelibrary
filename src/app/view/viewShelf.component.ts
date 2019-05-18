import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view-shelf',
  template: `
  <p> <code> {{res | json}} </code> </p>
  <form>
  <input name="shelf" placeholder="Hyllyn nimi" [(ngModel)]="name" required>
  <button mat-button type="submit" (click)="submit()"> OK </button>

  </form>`,
  styleUrls: ['./view.component.css']
})
export class ViewShelfComponent implements OnInit {
  private res;
  private id;
  private items;
  private name;


  constructor(private route: ActivatedRoute, private ds: DataService) { }

   ngOnInit() {
    this.route.params.subscribe( params => {
        this.id = params['id'];
    });

    this.getShelf();
}

  funk(res) {

    this.res = res[0];
    this.name = this.res.name;


  }
  getShelf() {
    this.ds.getShelf(this.funk.bind(this), this.id);
  }
  submit() {
    const body = {name: this.name, id: this.id};
    console.log(body);
    this.ds.updateShelfName(this.shelfUpdated.bind(this), body);
  }
  shelfUpdated(res) {
    this.getShelf();
  }


}
