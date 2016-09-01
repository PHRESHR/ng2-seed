import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'phrsr-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'PHRESHR';

  constructor() { }

  ngOnInit() {
  }

}
