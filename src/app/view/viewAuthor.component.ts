import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view-author',
  template: `

  <p> <code> {{items | json }} </code> </p>
  <p> <code> {{msg | json}} </code> </p>
  <form>
    <label for="author">Muuta nimeä</label>
    <input id="author" name="author" placeholder="Kirjailijan nimi" #nameElement="ngModel" [(ngModel)]="name" pattern=".{3,}" required>
    <button class="btn btn-primary" type="submit" [disabled]="!nameElement.valid" (click)="submit()">OK</button>
  </form>`,
  styleUrls: ['./view.component.css']
})
export class ViewAuthorComponent implements OnInit {
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

  callbackFunction(res, success) {
    if (success) {
      this.name = res['author'][0].name;
      this.items = res['books'];
    } else {
      this.msg = res.message + ' ' + res.description;
    }

  }
  getAuthor() {
    this.ds.getAuthor(this.callbackFunction.bind(this), this.id);
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
