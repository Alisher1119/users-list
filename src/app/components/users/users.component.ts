import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public service: UserService) {
  }

  ngOnInit(): void {
    this.service.getAll();
  }

  getAll(page: number) {
    this.service.getAll(page);
  }
}
