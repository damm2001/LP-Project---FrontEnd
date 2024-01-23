import { Component } from '@angular/core';
//Importación de la interfaz
import { EstudianteLibro} from 'src/app/interfaces/estudianteLibro';
//Importación del servicio
import { EjerciciosSerService  } from 'src/app/providers/ejercicios-ser.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
 /* LISTA CON LOS ATRIBUTOS DE LA INTERFAZ */
 displayedColumns: string[] = ['estudiante','libro'];
 //Atributo con el tipo de dato de la interfaz
 public data : EstudianteLibro[] = [];
 //Inyección de dependencia del servicio
 constructor(private dataProvider: EjerciciosSerService ) { }

 //Ejecución de la petición y suscripción de la respuesta
 ngOnInit() {
   this.dataProvider.getResponse().subscribe((response) => { 
     this.data = (response as EstudianteLibro[]); 
     console.log(this.data);
   })
 }}
