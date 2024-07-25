import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem[]=[];
  totalPrice:Subject<number>=new BehaviorSubject<number>(0);
  totalQuantity:Subject<number>=new BehaviorSubject<number>(0);

  //data will be available even browse is close
  storage:Storage=localStorage;
  
  //Data will be closed once the browser window is closed
  //storage:Storage = SessionStorage

  constructor() { 
    let data= JSON.parse(this.storage.getItem('cartItems'));
    if(data != null){
      this.cartItems = data;
    }
    //compute totals based on the data that is read from storage
    this.computeCartTotals();
  }


  persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }

addToCart(theCartItem:CartItem){
  //check if we already have the item in our cart
  let alreadyExistsIncart:boolean=false;
  let existingCartItem:CartItem | undefined;

  if(this.cartItems.length>0){
    //finding the item in the cart base on item id
    existingCartItem=this.cartItems.find(
      (tempCartItem)=>tempCartItem.id===theCartItem.id
    
    );
    //check if we found it
    alreadyExistsIncart=existingCartItem!=undefined;
  }
  if(alreadyExistsIncart){
    //increment the Quantity
    alert('Product Updated')
    existingCartItem.quantity++;
  }else{
    //just add the item to the cartItem array
    alert('New product added to cart')
    this.cartItems.push(theCartItem);
  }
  //compute  card total and quantity
  this.computeCartTotals();
}
computeCartTotals(){

  let totalPriceValue = 0;
  let TotalQuantityValue=0;
  for(let currentCartItem of this.cartItems){
    totalPriceValue += currentCartItem.quantity*currentCartItem.unitPrice;
    TotalQuantityValue += currentCartItem.quantity;
  }
  //publish new values 
  this.totalPrice.next(totalPriceValue);
  this.totalQuantity.next(TotalQuantityValue);

  //persist cart data 
  this.persistCartItems();
}
remove(theCartItem:CartItem){
  const itemIndex = this.cartItems.findIndex(
    (tempCartItem)=>tempCartItem.id === theCartItem.id
  );
  if(itemIndex > -1){
    this.cartItems.splice(itemIndex,1);

    //update cart total and cart price
    this.computeCartTotals();
  }

}
decrementQuantity(theCartItem:CartItem){
  theCartItem.quantity--;

  if(theCartItem.quantity===0){
    //remove the cart item from cart
    this.remove(theCartItem);

  }else{
    this.computeCartTotals();
  }
}

incrementQuantity(theCartItem:CartItem){
  theCartItem.quantity++;
  this.computeCartTotals();
}
}
