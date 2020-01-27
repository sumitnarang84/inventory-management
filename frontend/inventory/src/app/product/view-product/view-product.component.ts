import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  constructor(private apiService : ApiService, private actRoute : ActivatedRoute) { }
  product: any = [];
  ngOnInit() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    return this.apiService.productById(id)
            .pipe(first())
            .subscribe(
              (data : {}) => {
                this.product = data
                  
              },
              error => {
                  console.log(error.status);
              });
  }

}




