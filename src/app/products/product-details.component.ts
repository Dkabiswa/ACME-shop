import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = 'Product Detail'
  product: IProduct
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle = `${this.pageTitle}: ${id}`;
    this.product = {
      productId: id,
      productName: "Leaf Rake",
      productCode: "GDN-0011",
      releaseDate: "March 19, 2019",
      description: "Leaf rake with 48-inch wooden handle.",
      price: 19.95,
      starRating: 3.2,
      imageUrl: "assets/images/leaf_rake.png"
    }
  }

  onBack() {
    this.router.navigate(['/products']);
  }
}
