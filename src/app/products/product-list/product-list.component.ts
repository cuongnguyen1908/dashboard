import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  isLoading = false;
  filteredName = '';
  constructor(private productService: ProductService, private router: Router) {}
  products: Product[];
  ngOnInit(): void {
    this.isLoading = true;
    this.onInitProduct();
  }
  onAddNew() {
    this.router.navigate(['dashboard/products/new']);
  }
  onViewDetail(id: string) {
    this.router.navigate(['dashboard/products', id]);


  }

  onInitProduct() {
    this.productService.getAllProduct().subscribe(
      (res) => {
        this.products = res;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  onUpdate(id: string) {
    this.router.navigate(['dashboard/products','edit', id]);
  }
  onDelete(id: string) {
    if(confirm('Do you want to delete?')) {
      this.productService.deleteProduct(id).subscribe(res => {
    this.onInitProduct();

      }, error => {
        console.log(error);
      })
    }
  }
}
