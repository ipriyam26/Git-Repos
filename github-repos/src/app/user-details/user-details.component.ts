import { Component, OnInit, Input } from '@angular/core';

import { User } from '../user';
import { Repository } from '../repository';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User = {} as User;
  @Input() repositories: Repository[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
