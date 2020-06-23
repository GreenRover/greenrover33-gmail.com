import { TestBed } from '@angular/core/testing';
import { ChatService } from './chat.service';
import { LoginComponent } from './../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, AfterViewInit, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ChatMessage } from './chat.message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  userName: string;
  form: FormGroup;
  public dataSource = new MatTableDataSource<ChatMessage>();
  public displayedColumns: string[] = ['text'];

  @ViewChild (MatTable, {static: true})
  private table;

  constructor( //
    public dialog: MatDialog, //
    private fb: FormBuilder, //
    private chatService: ChatService,
  ) { }

  ngAfterViewInit(): void {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().toPromise().then(result => {
      this.userName = result;
    });

    this.chatService.getFluxMessages().subscribe((chatMessage) => {
      this.dataSource.data.push(chatMessage);
      this.table.renderRows();
    })
  }

  submitMessage(): void {
    console.log("message submit: " + this.form.value.text);
    this.chatService.saveChatMessage({
      from: this.userName,
      timeStamp: Date.now(),
      text: this.form.value.text,
    });
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      text: ['erlenried']
    });
 }


}

