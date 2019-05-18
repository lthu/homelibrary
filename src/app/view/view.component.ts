import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view',
  template: `

  <p> <code> {{msg | json}} </code> </p>
  <ng-container *ngIf="validBook">
    <h1 id="title">{{res.name}} <a class="modifyLink" routerLink="/homeLibrary/modify/book/{{id}}" routerLinkActive="active">M</a></h1>
    <hr>
    <div id="cont">
      <p><b>Tekijä:</b>  {{res.author}} </p>
      <p><b>Vuosi:</b>  {{res.year}} </p>
      <p><b>Kategoria:</b>  {{res.category}} </p>
      <p><b>Tyylilajit:</b>  {{res.genres}} </p>
      <p><b>Kuvaus:</b>  {{res.description}} </p>
      <p><b>Lisätiedot:</b>  {{res.info}} </p>
      <p><b>Hylly:</b>  {{res.shelf}} </p>
      <p><b>Tila:</b> <span [class.hylly]="isInShelf"> {{res.status}} </span></p>
      <p>
    <a *ngFor="let picture of pictures" href="http://lauri.kk4.fi/assets/{{picture}}">
    <img  width=216 height=288 src="http://lauri.kk4.fi/assets/{{picture}}"></a>
    </p>

  </div>
</ng-container>

  `,
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
 
  private validBook = false;
  private id: number;
  private res = {ID: '', name: '', category: '', author: '', authorId: '', year: '', shelf: '', info: '', isbn: '', description: '', status: '',};
  private genre = [];
  private pictures = [];
  private msg;
  private isInShelf: boolean;
  constructor(private route: ActivatedRoute, private ds: DataService) { }


  ngOnInit() {
    this.route.params.subscribe( params => {
      this.id = params['id'];
    });

    this.ds.fetchOne(this.id, this.callbackFunction.bind(this));
  }

  callbackFunction(res, success) {
    if (success) {
      this.validBook = true;
      this.res = res[0];

      this.setPictures();
      if (this.res.status === 'Hyllyssä') {
        this.isInShelf = true;
      } else {
        this.isInShelf = false;
      }
    } else {
      this.msg = res.message + ' ' + res.description;
    }

  }
  setPictures() {
    if (this.res["pictures"]) {
      this.pictures = this.res["pictures"].split(',');
    } else {
    this.pictures[0] = 'nopic.jpg';
    }
  }
}
