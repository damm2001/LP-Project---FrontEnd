import { Component } from '@angular/core';


import {Estudiante} from 'src/app/interfaces/estudiante';


//Importación del servicio

import { RegistroServService } from 'src/app/providers/registro-serv.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent {

   /* LISTA CON LOS ATRIBUTOS DE LA INTERFAZ */
   displayedColumns: string[] = ['nombre','correo','nombre_usuario'];
   //Atributo con el tipo de dato de la interfaz
   public data : Estudiante[] = [];
   //Inyección de dependencia del servicio
   constructor(private dataProvider: RegistroServService) { }
 
   //Ejecución de la petición y suscripción de la respuesta
   ngOnInit() {
     this.dataProvider.getResponse().subscribe((response) => { 
       this.data = (response as Estudiante[]); 
       console.log(this.data);
     })
   }

}
