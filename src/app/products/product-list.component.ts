import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product'

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;
  private _listFilter: string;
  filteredProducts: IProduct[];
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this._listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  get listFilter() {
    return this._listFilter
  }
  products: IProduct[] = [];

  constructor(private productService: ProductService) {
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => 
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = `you clicked ${message} rating`
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      // data => {this.products = data;// want to do something like this
      //   this.filteredProducts = this.products;
      // },
      // error => { console.log(error); // Error if any
      // },
      {
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
        console.log(this.filteredProducts);
      },
      error : err => {this.errorMessage = err}
    }
    );
    console.log(this.products);
  }
}
