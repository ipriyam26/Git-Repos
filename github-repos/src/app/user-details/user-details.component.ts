import { Component, OnInit, Input } from '@angular/core';

import { User } from '../user';
import { Repository } from '../repository';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  openRepo(link: string) {
    window.open(link, '_blank');
  }
  @Input() user: User = {} as User;
  @Input() repositories: Repository[] = [];
  currentPage = 1;
  itemsPerPage = 9;
  displayedRepos: Repository[] = [];
  numberOfPages = 0;
  pages: number[] = [];

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
  constructor() {}

  ngOnInit(): void {
    this.numberOfPages =
      Math.ceil(this.repositories.length / this.itemsPerPage) + 1;
    // make a list of numbers from 1 to numberOfPages
    this.pages = Array.from(Array(this.numberOfPages).keys());
    this.pages = this.pages.slice(1);
  }
}
