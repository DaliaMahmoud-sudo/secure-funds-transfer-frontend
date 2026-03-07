import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

   private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required , Validators.minLength(3)]),
    password: new FormControl("", [Validators.required ])
  });

 errorMsg:string="";
  loading:boolean=false;
  registersubscribe: Subscription=new Subscription();
  submitForm():void {

   if(this.loginForm.valid){
    this.loading=true;
    this.registersubscribe.unsubscribe();
      this.registersubscribe= this.authService.signIn(this.loginForm.value).subscribe({
        next:(response) =>{
         localStorage.setItem("token",response.token);
          this.router.navigate(["/feed"]);
        },
        error:(error:HttpErrorResponse)=>{
         this.errorMsg=error.error.message;
       },complete:()=>{
        this.loading=false;
       }
      })
   }
   else{
    this.loginForm.markAllAsTouched();
   }
  }

}
