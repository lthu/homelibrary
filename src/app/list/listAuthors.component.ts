import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { MatSort, MatTableDataSource } from '@angular/material';




@Component({
  selector: 'app-authors',
  templateUrl: './listAuthors.component.html'

})
export class ListAuthorsComponent  implements OnInit{
@Input() authors;
displayedColumns = ['id', 'name'];
ngOnInit() {

  }
}
