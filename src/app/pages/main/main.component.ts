import { Component } from '@angular/core';
//Importación de la interfaz
import { DatosInter} from 'src/app/interfaces/datos-inter';
import { Libro} from 'src/app/interfaces/libro';
//Importación del servicio
import { DatosProvedorService } from 'src/app/providers/datos-provedor.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
   /* LISTA CON LOS ATRIBUTOS DE LA INTERFAZ */
  displayedColumns: string[] = ['titulo','autor','edicion','disponibilidad','valoracion'];
  //Atributo con el tipo de dato de la interfaz
  public data : Libro[] = [];
  //Inyección de dependencia del servicio
  constructor(private dataProvider: DatosProvedorService) { }

  //Ejecución de la petición y suscripción de la respuesta
  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => { 
      this.data = (response as Libro[]); 
      console.log(this.data);
    })
  }

  

  
}
