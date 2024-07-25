import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl='http://localhost:8080/api'

  constructor(private http: HttpClient) { }


  getProductList( theCategoryId:number){

    let searchUrl ='http://localhost:8080/api/products/search/findByCategoryId?id=' +
    theCategoryId;
    return this.http
    //.get<GetResponseproduct>(this.baseUrl+'/products')
    .get<GetResponseproducts>(searchUrl)
    .pipe(map((responce)=>responce._embedded.products));

  }
  getProductCategories(){

    let productCategoryUrl='http://localhost:8080/api/product-category';
    return this.http
    .get<GetResponseproductCategory>(productCategoryUrl)
    .pipe(map((responce)=>responce._embedded.productCategory));
  }

  searchProducts(theKeyword:string){
    const searchUrl='http://localhost:8080/api/products/search/findByNameContaining?name='+theKeyword;
    return this.http
    //.get<GetResponseproduct>(this.baseUrl+'/products')
    .get<GetResponseproducts>(searchUrl)
    .pipe(map((responce)=>responce._embedded.products));
  }
  getProduct( theProductId: number){

    const productUrl='http://localhost:8080/api/products/' + theProductId;

    return this.http
    .get<Product>(productUrl);

  }
  
}


//Unwraps the json data from backend spring rest _embedded entry
interface GetResponseproducts{
  _embedded:{
    products:Product[]
  }
}

interface GetResponseproductCategory{
  _embedded:{
    productCategory: ProductCategory[]
  };
}

