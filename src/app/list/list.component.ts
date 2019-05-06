import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';


export interface Book {
  ID: number;
  nimi: string;
  tekija: string;
  vuosi: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  items: Book[];
  datasource;
  dataS;
  kirjailijjat: any[];

  displayedColumns = ['nimi', 'tekija', 'vuosi' ];


  constructor(private cs: CookieService, private ds: DataService) { }

  ngOnInit() {
    this.ds.fetchAll(this.funk.bind(this));
    this.ds.getAuthors(this.setAuthors.bind(this));
    this.cs.set("keksi", "value");
  }
  funk(res) {
    this.items = res;
    this.datasource = new MatTableDataSource(this.items);
    this.datasource.sort = this.sort;
  }
  setAuthors(res) {
    this.kirjailijjat = res;
  }
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();

  }
  toggleFilter() {
    console.log(this.items);
  }
}
