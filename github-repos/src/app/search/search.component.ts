import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Repository } from '../repository';
import { User } from '../user';
import { SearchEvent } from '../search_event';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  username: string = '';
  faSearch = faSearch;
  @Output() onSubmit = new EventEmitter<SearchEvent>();
  user: User = {} as User;
  repositories: Repository[] = [];
  error: any;

  constructor(private http: HttpClient) {}

  submit() {
    if (!this.username) {
      this.error = "Please enter a valid username";
      return;
  }

  // check for valid input
  let regExp = new RegExp(/^[a-zA-Z0-9]([a-zA-Z0-9]|[-])*$/);
  if (!regExp.test(this.username)) {
      this.error = "Please enter a valid username";
      return;
  }

  // check for network connectivity
  if (!navigator.onLine) {
      this.error = "You are not connected to the internet";
      return;
  }
    this.getUser();
    this.getRepos();
  }

  getUser() {
    this.http
      .get<User>(`https://gitrepo2.onrender.com/users/${this.username}`)
      .subscribe(
        (user: User) => {
          this.user = user;
          console.log(this.user)
        },
        (error) => {
          this.error = error;
        }
      );
  }

  getRepos() {
    this.http
      .get<Repository[]>(
        `https://gitrepo2.onrender.com/users/${this.username}/repos`
      )
      .subscribe(
        (repositories: Repository[]) => {
          this.repositories = repositories;
          this.onSubmit.emit({
            user: this.user,
            repositories: this.repositories,
          });
        },
        (error) => {
          this.error = error;
        }
      );
  }
}
