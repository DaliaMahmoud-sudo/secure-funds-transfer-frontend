import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccServiceService {
    private readonly httpClient=inject(HttpClient);
 getAcc(){
  return this.httpClient.get(environment.baseUrl + "/account");

 }
}
