import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginAuthService } from './guards/login-auth.service';

const routes: Routes = [
  {path: 'contact-us', component: ContactUsComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'products',component:ProductListComponent},
  {path:'',component:HomeComponent},
  {path:'category',component:ProductListComponent},
  {path:'category/:id',component:ProductListComponent},
  {path: 'search/:keyword',component: ProductListComponent},
  {path: 'products/:id',component: ProductDetailsComponent},
  {path: 'cart-details',component: CartDetailsComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'checkout',component:CheckoutComponent,canActivate:[LoginAuthService]}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
