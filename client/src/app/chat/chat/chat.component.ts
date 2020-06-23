import { LoginComponent } from './../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, AfterViewInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  userName: string;
  form: FormGroup;
  public dataSource = new MatTableDataSource<Nachricht>();
  public displayedColumns: string[] = ['text'];

  constructor( //
    public dialog: MatDialog, //
    private fb: FormBuilder //
  ) { }

  ngAfterViewInit(): void {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().toPromise().then(result => {
      this.userName = result;
    });
  }

  submitMessage(): void {
    const d = this.dataSource.data;
    d.push({text: this.form.value.text});
    this.dataSource.data = d;
  }

  @Input()
  public set nachrichten(nachrichten: Nachricht[]) {
    this.dataSource.data = nachrichten;
  }

  ngOnInit(): void {
    this.dataSource.data = [{text: 'Tag'}, {text: 'wie gehts'}, {text: 'denn so?'}];
    this.form = this.fb.group({
      text: ['erlenried']
    });
 }


}

export interface Nachricht {
  text: string;
}

