import { LocationService } from './../../api/api/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  editing: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public api: LocationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      name: ['', [
        Validators.pattern(/[A-Z]\w+/),
        Validators.minLength(3)
      ]]
    });

    this.route.params.subscribe(params => {
      if (params.id) {
        this.api.get(params.id).subscribe(location => {
          this.form.setValue(location);
          this.editing = location.name;
        });
      }
    });
  }

  submitForm(): void {
    if (this.form.value.id) {
      this.api.update( //
        this.form.value, //
        this.form.value.id
      ).subscribe(res => {
        console.log('Location wurde gespeichet');
        this.location.back();
      }, err => {
        console.error('Location wurde nicht gespeichet', err);
      });
    } else {
      this.api.create(this.form.value).subscribe(newLocation => {
        console.log('Location wurde erstellt', newLocation);
        this.router.navigateByUrl('location/list');
      }, err => {
        console.error('Location wurde nicht erstellt', err);
      });
    }
  }

}
