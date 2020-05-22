import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id = '';
  product: Product = new Product();
  isLoading = false;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.id).subscribe(res => {
     this.product = res;
     this.isLoading = false;
    }, error => {
      console.log(error);
     this.isLoading = false;
    })
  }
  onBack() {
    this.router.navigate(['/dashboard/products'])
  }

  onUpdate() {
    this.router.navigate(['dashboard/products','edit', this.id]);
  }
}
