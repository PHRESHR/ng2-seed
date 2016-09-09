import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Apollo, Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
// We need this to parse graphql string
import gql from 'graphql-tag';

import { client } from '../client.ts';

const query = gql`
  query getString {
    testString
  }
`;

@Component({
  selector: 'phrsr-browse',
  templateUrl: 'browse.component.html',
  styleUrls: ['browse.component.css']
})
@Apollo({
  client,
  queries() {
    return {
      data: { query },
    };
  }
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
