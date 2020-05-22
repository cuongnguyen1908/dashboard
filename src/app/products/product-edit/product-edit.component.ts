import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  @ViewChild('f', {static: false}) productForm;
  defaultStatus = 'enable';
  editMode =  false;
  product: Product;
  id: string;
  submited = false;
  // isLoading = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.editMode = this.id != null;
    if(this.editMode) {
      // this.isLoading = true;
      this.getProductById(this.id);

    }


  }
  onBack() {
    this.router.navigate(['/dashboard/products'])

  }


  formInit(name: string, price: number, quantity: number, status: string, description: string, imgPath: string) {
      this.productForm.setValue({
        name: name,
        price: price,
        quantity: quantity,
        status: status,
        description: description,
        imgPath: imgPath,
      })

  }

  getProductById(id: string) {
    this.productService.getProductById(id).subscribe(res => {
      this.product = res;
      this.formInit(this.product.name, this.product.price, this.product.quantity, this.product.status, this.product.description, this.product.imgPath);
      // console.log('done');

    }, error => {
      console.log(error);

    })
  }


  onSubmit() {
    this.product = new Product();
    const data = Object.assign(this.product, this.productForm.value);
    if(this.editMode) {
      this.productService.updateProduct(this.id, data).subscribe(res => {
        this.router.navigate(['/dashboard/products']);
      }, error => {
        console.log(error);
      })

    }else {
      this.productService.addProduct(data).subscribe(resolve => {
        this.router.navigate(['/dashboard/products']);

      }, error => {
        console.log(error);
      })
    }


  }


  onClear() {
    this.productForm.reset();
    this.editMode = false;
    this.submited = false;
  }
}
