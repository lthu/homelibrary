import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view-author',
  template: `
  <p> id = {{id}} </p>
  <p> <code> {{res}} </code> </p>
  <p> <code> {{items | json }} </code> </p>
  <form>
  <input name="author" placeholder="Kirjailijan nimi" [(ngModel)]="name">
  <button mat-button type="submit" (click)="submit()"> OK </button>
  <span> {{msg | json}} </span>
  </form>`,
  styleUrls: ['./view.component.css']
})
export class ViewAuthorComponent implements OnInit {
  private res;
  private id;
  private items;
  private name;
  private msg = '';

  constructor(private route: ActivatedRoute, private ds: DataService) { }

   ngOnInit() {
    this.route.params.subscribe( params => {
        this.id = params['id'];
    });

    this.getAuthor();
}

  funk(res) {

    this.res = res['author'][0].name;
    this.name = this.res;
    this.items = res['books'];

  }
  getAuthor() {
    this.ds.getAuthor(this.funk.bind(this), this.id);
  }
  submit() {
    const body = {name: this.name, id: this.id};
    this.ds.updateAuthorName(body, this.authorUpdated.bind(this));
  }
  authorUpdated(res) {
    this.msg = res;
    this.getAuthor();
  }


}
