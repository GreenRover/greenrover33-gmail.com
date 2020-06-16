import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(//
    private fb: FormBuilder, //
    public dialogRef: MatDialogRef<LoginComponent>, //
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [
        Validators.pattern(/[A-Z]\w+/),
        Validators.minLength(3)
      ]]
    });
  }

  submitForm(): void {
    this.dialogRef.close(this.form.value.name);
  }

}
