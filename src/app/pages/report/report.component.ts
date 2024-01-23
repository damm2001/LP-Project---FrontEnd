import { Component } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import {Estudiante} from 'src/app/interfaces/estudiante';

//Importación de la interfaz
import { DatosInter } from 'src/app/interfaces/datos-inter';
import { Ejerciciointer } from 'src/app/interfaces/ejerciciointer';
import { RegistroInter } from 'src/app/interfaces/registro-inter';
//Importación del servicio
import { DatosProvedorService } from 'src/app/providers/datos-provedor.service';
import { RegistroServService } from 'src/app/providers/registro-serv.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, NgIf, NgFor, FormsModule, MatTableModule],
})

export class ReportComponent {

   /* LISTA CON LOS ATRIBUTOS DE LA INTERFAZ */
   displayedColumns: string[] = ['nombre','correo'];
   //Atributo con el tipo de dato de la interfaz
   public data : Estudiante[] = [];
   //Inyección de dependencia del servicio
   constructor(private dataProvider: DatosProvedorService) { }
 
   //Ejecución de la petición y suscripción de la respuesta
   ngOnInit() {
     this.dataProvider.getResponse().subscribe((response) => { 
       this.data = (response as Estudiante[]); 
       console.log(this.data);
     })
   }

}
