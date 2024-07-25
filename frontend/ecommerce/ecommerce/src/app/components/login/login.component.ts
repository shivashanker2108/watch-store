import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  customerFormGroup : FormGroup

  constructor(private formBuilder: FormBuilder,
    private customerService:CustomerService,
    private AuthService:AuthService,
    private router:Router
  ){}

  ngOnInit(){
    this.customerFormGroup=this.formBuilder.group({
      customer : this.formBuilder.group({
        email:['',[Validators.required]],
        password:['',[Validators.required]], 
      }),
    });
  }

  get email(){
    return this.customerFormGroup.get('customer.email');
  }
  get password(){
    return this.customerFormGroup.get('customer.password')
  }
  onSubmit(){
    if(this.customerFormGroup.invalid){
      this.customerFormGroup.markAllAsTouched();
      return;
    }
    let customer = this.customerFormGroup.controls['customer'].value

    this.customerService.login(customer).subscribe((data)=>{
      if(data != null){
        alert("Login Successful")
        //storing values in storage
        this.AuthService.setFirstName(data.firstName);
        this.AuthService.setLastName(data.lastName);
        this.AuthService.setEmail(data.email);
        this.AuthService.setMobile(data.mobile.toString());

        //redirect to home Page
        this.router.navigateByUrl('');
      }else{
        alert('Invalid Credetials')
      }
    })
  }
}
