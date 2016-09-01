import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'phrsr-browse',
  templateUrl: 'browse.component.html',
  styleUrls: ['browse.component.css']
})
export class BrowseComponent implements OnInit {
  title = 'Browse';

  constructor(
    private titleService: Title,
  ) {
    this.titleService.setTitle(this.title);
   }

  ngOnInit() {
  }

}
