import { Component } from '@angular/core';
import { User } from './user';
import { Repository } from './repository';
import { SearchEvent } from './search_event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'github-repos';
  showSearch = true;
  user: User = {} as User;
  repositories: Repository[] = [];

  onSearchSubmit(event: SearchEvent) {
    this.showSearch = false;
    //retrieve user data from event
    this.user = event.user;
    this.repositories = event.repositories;
  }
}
