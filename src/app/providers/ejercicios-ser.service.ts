import { Injectable } from '@angular/core';
//Importación del módulo 
import { HttpClient, HttpClientModule } from  '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EjerciciosSerService {
  //Atributo URL
  private URL: string = 'http://localhost:3000/rest/dbEjercicios/findall/json';
  
  //Inyección de dependencia del HttpClient
  constructor(private http:HttpClient) { }
  
   //Método con la petición HTTP
   getResponse() {
    return this.http.get(this.URL);
  }
}
