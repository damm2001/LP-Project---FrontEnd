import { Injectable } from '@angular/core';

//Importación del HttpClient
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosProvedorService {
   //Atributo URL
   private URL: string = 'http://127.0.0.1:4567/api/books';

  //Inyección de dependencia del HttpClient
  constructor(private http:HttpClient) { }

   // Método con la petición HTTP
  getResponse(): Observable<any> {
    // Configura las cabeceras para la solicitud
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200/main'  // Cambia esto con el origen de tu aplicación Angular
    });
    

    // Realiza la solicitud con las cabeceras configuradas
    return this.http.get(this.URL, { headers });
  }

  
}
