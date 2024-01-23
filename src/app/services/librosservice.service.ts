import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../interfaces/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosserviceService {
  private URL:string = 'http://localhost:4567/api/libros'
  private likedURL:string = 'http://localhost:4567/api/estudiantes_libros'
  private deleteLikedLibro:string = `http://localhost:4567/api/estudiantes_libros/`
  private createRute: string = 'http://localhost:4567/api/libros';



  constructor(private http:HttpClient) { }

  
  getResponse(){
    return this.http.get(this.URL);
  }

  getLikedRespone(){
    return this.http.get(this.likedURL);
  }

  deleteLikedRecord(route:Libro, user:string){
    let url = this.deleteLikedLibro+user+"/"+route.titulo;
    return this.http.delete(url);
  }

  addRoute(routeName: string, places: string[]) {
    const data = {
      nombre: routeName,
      lugares: places,
      likes: 0,
      no_recomendado: 0,
    };

    return this.http.post(`${this.createRute}`, data);
  }
  addUserRoute(routeName: string, user: string){

    const data = {
      usuario: user,
      ruta: routeName
    };

    return this.http.post(`${this.likedURL}`, data);
  }
}
