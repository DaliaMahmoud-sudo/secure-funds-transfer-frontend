import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  registerForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    password: new FormControl("", [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
  });

  errorMsg:string="";
  loading:boolean=false;
  registersubscribe: Subscription=new Subscription();
  submitForm():void {

   if(this.registerForm.valid){
    this.loading=true;
    this.registersubscribe.unsubscribe();
      this.registersubscribe= this.authService.signUp(this.registerForm.value).subscribe({
        next: (response: any) => {
    console.log(response);
    this.router.navigate(['/login']);
},
       error: (error: HttpErrorResponse) => {
    this.errorMsg = error.error?.message || 'Registration failed';
    alert(this.errorMsg);      // show error message
},complete:()=>{
        this.loading=false;
       }
      })
   }
   else{
    this.registerForm.markAllAsTouched();
   }
  }

}
