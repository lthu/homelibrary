import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';

export interface Book {
  ID: number;
  name: string;
  author: string;
  year: number;
  shelf: string;
  genres: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  nameFilter = new FormControl('');
  authorFilter = new FormControl('');
  yearFilter = new FormControl('');

  items: Book[];
  datasource;
  dataS;
  authors: any[];

  displayedColumns = ['name', 'author', 'year', 'shelf', 'genres' ];
  filterValues = {
    name: '',
    author: '',
    year: '',
};

  constructor(private ds: DataService) {}

  ngOnInit() {
    this.nameFilter.valueChanges
    .subscribe(
      name => {
        this.filterValues.name = name;
        this.datasource.filter = JSON.stringify(this.filterValues);
      }
    );
    this.authorFilter.valueChanges
    .subscribe(
      author => {
        this.filterValues.author = author;
        this.datasource.filter = JSON.stringify(this.filterValues);
      }
    );
    this.yearFilter.valueChanges
    .subscribe(
      year => {
        this.filterValues.year = year;
        this.datasource.filter = JSON.stringify(this.filterValues);
      }
    );

    this.ds.fetchAll(this.funk.bind(this));
    this.ds.getAuthors(this.setAuthors.bind(this));

  }
  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
      && data.author.toString().toLowerCase().indexOf(searchTerms.author) !== -1;
    }
    return filterFunction;
  }
  funk(res) {
    console.log(res);
    this.items = res;
    this.datasource = new MatTableDataSource(this.items);
    this.datasource.filterPredicate = this.tableFilter();
    this.datasource.sort = this.sort;

  }
  setAuthors(res) {
    this.authors = res;
  }

}
