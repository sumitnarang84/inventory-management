import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    addProductForm: FormGroup;
    loading = false;
    submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService : ApiService,
    private router: Router) { 
    
  }

  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get f() { return this.addProductForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addProductForm.invalid) {
        return;
    }

    this.loading = true;
    this.apiService.addProduct(this.f.name.value, this.f.description.value)
        .pipe(first())
        .subscribe(
            data => {
                if (data.id) {
                  this.router.navigate(['/products'])
                }
            },
            error => {
                console.log(error.status);
            });
  }

}
