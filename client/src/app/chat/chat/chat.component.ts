import { LoginComponent } from './../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  userName: string;

  constructor( //
    public dialog: MatDialog //
  ) { }

  ngAfterViewInit(): void {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().toPromise().then(result => {
      this.userName = result;
    });
  }

  ngOnInit(): void {

  }

  submitMessage(): void {

  }

}
