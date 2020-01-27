import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: any = [];
  constructor(private apiService : ApiService) { }

  ngOnInit() {
    return this.apiService.products()
            .pipe(first())
            .subscribe(
              (data : {}) => {
                this.products = data
                  
              },
              error => {
                  console.log(error.status);
              });
  }

}
