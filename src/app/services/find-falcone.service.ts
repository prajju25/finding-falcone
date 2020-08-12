import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FindFalconeService {
  
  findFalcone(request: Object) {
    return this.http.post('http://findfalcone.herokuapp.com/find', request).toPromise();
  }
  getVehicles(): any {
    return this.http.get('http://findfalcone.herokuapp.com/vehicles').toPromise();
  }
  getPlanets(): any {
    return this.http.get('http://findfalcone.herokuapp.com/planets').toPromise();
  }
  async getToken(): Promise<Object> {
    return this.http.post('http://findfalcone.herokuapp.com/token', null).toPromise();
  }
  constructor(private http: HttpClient) { }
}
