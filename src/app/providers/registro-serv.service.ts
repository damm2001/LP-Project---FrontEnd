import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroServService {
//Atributo URL
private URL: string = 'http://localhost:3000/rest/dbRegistro/findall/json';
      
//Inyección de dependencia del HttpClient
constructor(private http:HttpClient) { }

 //Método con la petición HTTP
 getResponse() {
  return this.http.get(this.URL);
}
}
