import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TransferService {
      private readonly httpClient=inject(HttpClient);
 transfer(data:object){
  return this.httpClient.post(environment.baseUrl + "/transfers", data, { responseType: 'text' });
}
 transaction(){
  return this.httpClient.get(environment.baseUrl + "/transactions");

 }

}
