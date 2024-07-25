import { Injectable } from '@angular/core';
import { Country } from '../common/country';
import { State } from '../common/state';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  
  contriesUrl='http://localhost:8080/api/countries';
  stastesUrl='http://localhost:8080/api/states';
  constructor( private http:HttpClient) { }

  getCountries(){
return this.http
.get<GetResponceCountries>(this.contriesUrl)

.pipe(map((response)=>response._embedded.countries));
  }

  
   placeOrder(purchase: Purchase) {
    const checkoutUrl = 'http://localhost:8080/api/checkout/purchase';
    return this.http.post<Purchase>(checkoutUrl, purchase);
  }

  getStates(theCountryCode:string){
    const searchStatesUrl='http://localhost:8080/api/states/search/findByCountryCode?code='+ theCountryCode;
    return this.http
    .get<GetResponceStates>(searchStatesUrl)
    .pipe(map((responce)=>responce._embedded.states));
  }
}

interface GetResponceCountries{
  _embedded:{
    countries:Country[];
  };
}
interface GetResponceStates{
  _embedded:{
    states:State[];
  };
}
