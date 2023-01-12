import { Component, OnInit, Input } from '@angular/core';

import { User } from '../user';
import { Repository } from '../repository';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  sortBy: string = '';
  openRepo(link: string) {
    window.open(link, '_blank');
  }
  // searchTerm:string = '';
  @Input() user: User = {} as User;
  @Input() repositories: Repository[] = [];
  currentPage = 1;
  itemsPerPage = 9;
  displayedRepos: Repository[] = [];
  numberOfPages = 0;
  pages: number[] = [];
  randomImage = 0;

  getCurrentPageRepos(): Repository[] {
    let startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    return this.repositories.slice(startIndex, endIndex);
  }

  onNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 37) {
      // left arrow key
      this.onPreviousPage();
    } else if (event.keyCode === 39) {
      // right arrow key
      this.onNextPage();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.repositories.length / this.itemsPerPage);
  }
  paginateRepos() {
    // calculate starting and ending index of repos to display
    let startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    // slice the repos array to only display repos for the current page
    this.displayedRepos = this.repositories.slice(startIndex, endIndex);
  }

  handlePageChange(pageNum: number) {
    this.currentPage = pageNum;
    this.paginateRepos();
  }

  sortRepos(sortBy: string) {
    this.sortBy = sortBy; // set the selected sort criteria
    switch (sortBy) {
      case 'name':
        this.repositories = this.repositories.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case 'stargazers_count':
        this.repositories = this.repositories.sort(
          (a, b) => -a.stargazers_count + b.stargazers_count
        );
        break;
      case 'forks_count':
        this.repositories = this.repositories.sort(
          (a, b) => -a.forks_count + b.forks_count
        );
        break;
      case 'watchers':
        this.repositories = this.repositories.sort(
          (a, b) => -a.watchers + b.watchers
        );
        break;
      case 'open_issues_count':
        this.repositories = this.repositories.sort(
          (a, b) => -a.open_issues_count + b.open_issues_count
        );

        break;
    }
    this.currentPage = 1; // reset current page to 1
    // console.log(
    //   this.repositories.map((r)=>r.stargazers_count)
    // );
    this.paginateRepos();
  }
  // search() {
  //   if(this.searchTerm && this.searchTerm.trim() !== ''){

  //     this.repositories = this.repositories.filter((repo) => {
  //       return repo.name.includes(this.searchTerm);
  //     });
  //   }
  //   console.log("Searching for ", this.searchTerm);
  //   this.currentPage = 1;
  //   this.paginateRepos();
  // }

  constructor() {
  //   const searchInput = fromEvent(
  //     document.getElementById('search-input'), 'keyup')
  //   .pipe(
  //      debounceTime(300),   // wait for 300ms after the last keyup event
  //      distinctUntilChanged() // only emit if the value changes
  //  );
  //  searchInput.subscribe(() => this.search());
  }
  testFunction() {
    this.user = {
      login: 'testUser',
      avatar_url: 'https://testurl.com',
      bio: 'Lead developer on Wagtail CMS. Please do not email me directly with Wagtail support questions - see https://docs.wagtail.io/en/stable/support.html      ',
      location: 'test location',
      twitter_username: 'testhandle',
      blog: 'endIndex',
      repos_url: 'https://testrepos.com',
    };
    this.repositories = [
      {
        name: 'test repo 1',
        html_url: 'https://testrepo1.com',
        description: 'test repo 1 description',
        language: 'test language',
        stargazers_count: 10,
        forks_count: 5,
        open_issues_count: 5,
        watchers: 10,
        topics: ['test topic 1', 'test topic 2'],
      },
      {
        name: 'test repo 1',
        html_url: 'https://testrepo1.com',
        description: 'test repo 1 description',
        language: 'test language',
        stargazers_count: 10,
        forks_count: 5,
        open_issues_count: 5,
        watchers: 10,
        topics: ['test topic 1', 'test topic 2'],
      },
      {
        name: 'test repo 1',
        html_url: 'https://testrepo1.com',
        description: 'test repo 1 description',
        language: 'test language',
        stargazers_count: 10,
        forks_count: 5,
        open_issues_count: 5,
        watchers: 10,
        topics: ['test topic 1', 'test topic 2'],
      },
      {
        name: 'test repo 1',
        html_url: 'https://testrepo1.com',
        description: 'test repo 1 description',
        language: 'test language',
        stargazers_count: 10,
        forks_count: 5,
        open_issues_count: 5,
        watchers: 10,
        topics: ['test topic 1', 'test topic 2'],
      },
      {
        name: 'test repo 1',
        html_url: 'https://testrepo1.com',
        description: 'test repo 1 description',
        language: 'test language',
        stargazers_count: 10,
        forks_count: 5,
        open_issues_count: 5,
        watchers: 10,
        topics: ['test topic 1', 'test topic 2'],
      },
      {
        name: 'test repo 1',
        html_url: 'https://testrepo1.com',
        description: 'test repo 1 description',
        language: 'test language',
        stargazers_count: 10,
        forks_count: 5,
        open_issues_count: 5,
        watchers: 10,
        topics: ['test topic 1', 'test topic 2'],
      },
      {
        name: 'test repo 1',
        html_url: 'https://testrepo1.com',
        description: 'test repo 1 description',
        language: 'test language',
        stargazers_count: 10,
        forks_count: 5,
        open_issues_count: 5,
        watchers: 10,
        topics: ['test topic 1', 'test topic 2'],
      },
    ];
  }

  ngOnInit(): void {
    // this.testFunction();
    this.numberOfPages =
      Math.ceil(this.repositories.length / this.itemsPerPage) + 1;
    // make a list of numbers from 1 to numberOfPages
    this.pages = Array.from(Array(this.numberOfPages).keys());
    this.pages = this.pages.slice(1);

    // get the repos and add img_rng to each of them for random image
    this.repositories.forEach((repo) => {
      repo.img_rng = `https://picsum.photos/200/300?nocache=${Math.floor(
        Math.random() * 90
      )}`;
    });
  }
}
