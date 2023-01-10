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
    this.getUser();
    this.getRepos();
  }

  getUser() {
    this.http
      .get(`https://gitrepo2.onrender.com/users/${this.username}`)
      .subscribe(
        (user: any) => {
          this.user = user;
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
