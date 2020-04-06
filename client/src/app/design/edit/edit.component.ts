import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DesignService } from './../../api/api/design.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public designService: DesignService
  ) { }

  form: FormGroup;
  editing: string;

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.editing = null;

      if (params[`id`]) {
        this.designService.get(params[`id`]).subscribe(res => {
          this.editing = res.name;
          this.form.setValue(res);
        });
      }
    });
  }

  submitForm() {
    if (this.form.value.id) {
      this.designService.update(this.form.value, this.form.value.id).subscribe(res => {
        console.log('Design updated!')
        this.router.navigateByUrl('/design/list');
      });
    } else {
      this.form.value.id = 0;
      this.designService.create(this.form.value).subscribe(res => {
        console.log('Design created!')
        this.router.navigateByUrl('/design/list');
      });
    }

  }

}
