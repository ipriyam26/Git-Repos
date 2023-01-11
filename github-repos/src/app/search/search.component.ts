import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Repository } from '../repository';
import { User } from '../user';
import { SearchEvent } from '../search_event';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
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
  error: string = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

  submit() {
    this.isLoading = true;
    if (!this.username) {
      this.error = 'Please enter a valid username';
      return;
    }

    // check for valid input
    let regExp = new RegExp(/^[a-zA-Z0-9]([a-zA-Z0-9]|[-])*$/);
    if (!regExp.test(this.username)) {
      this.error = 'Please enter a valid username';
      return;
    }

    // check for network connectivity
    if (!navigator.onLine) {
      this.error = 'You are not connected to the internet';
      return;
    }
    // this.error = null;
    this.http
      .get<User>(`https://gitrepo2.onrender.com/users/${this.username}`)
      .pipe(
        switchMap((user: User) => {
          this.user = user;
          return this.http.get<Repository[]>(
            `https://gitrepo2.onrender.com/users/${this.username}/repos`
          );
        }),
        catchError((err) => {
          if (err.status == 500) {
            this.error =
              'Server Error: Server seems to be down please wait while we look into this';
          } else {
            this.error = 'User not found.';
          }
          this.isLoading = false
          return of();
        })
      )
      .subscribe((repositories: Repository[]) => {
        this.repositories = repositories;
        this.onSubmit.emit({
          user: this.user,
          repositories: this.repositories,
        });

        this.isLoading = false;
      });
  }
}
