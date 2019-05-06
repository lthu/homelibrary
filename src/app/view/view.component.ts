import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view',
  template: `
  <p> <code> {{msg | json}} </code> </p>
  <p>  <a routerLink="/modify/book/{{id}}" routerLinkActive="active">M</a></p>
  <h1>{{res.nimi}} </h1>
  <p>Tekijä - {{res.tekija}} </p>
  <p>Vuosi - {{res.vuosi}} </p>
  <p>Tyylilajit - {{res.tyylilajit}} </p>
  <p>Lisätiedot - {{res.lisatiedot}} </p>
  <p>Hylly - {{res.hylly}} </p>
  <p>Tila - {{res.tila}} </p>
  <p>
  <img *ngFor="let picture of pictures"  width=250 height=300 src="assets/{{picture}}">
  </p>
  <p><button type="submit" (click)="del()"> Delete </button></p>


  `,
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  private id: number;
  private res = {ID: '', nimi: '', tekija: '', tekija_id: '', vuosi: '', tyylilajit: '', kuvat: '', tila: '', hylly: '', lisatiedot: ''};
  private genre = [];
  private pictures = [];
  private msg;
  constructor(private route: ActivatedRoute, private ds: DataService) { }


  ngOnInit() {
    this.route.params.subscribe( params => {
      this.id = params['id'];
    });

    this.ds.fetchOne(this.id, this.funk.bind(this));
  }

  funk(res) {
    this.res = res[0];

    this.msg = res;
    this.setPictures();
  }

  setPictures() {
    if (this.res["kuvat"]) {
    this.pictures = this.res["kuvat"].split(',');
    } else {

    this.pictures[0] = 'nopic.jpg';
    }
  }

  del() {
    const body = {id: this.id};
    this.ds.deleteBook(this.callbackDelete.bind(this), body);
  }
  callbackDelete(res) {
    console.log(res);
  }

}
