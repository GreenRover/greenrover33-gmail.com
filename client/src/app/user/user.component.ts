
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  public user$: Observable<User>;
  public picture: string;

  constructor(
    private authService: AuthService,
  ) {
  }

  public ngOnInit(): void {
    this.user$ = this.authService.getUser$();
  }
}
