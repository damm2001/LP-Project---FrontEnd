import { Component } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

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

  public usuarios: DatosInter[] = [];
  public filtroEntrenamiento: RegistroInter[] = [];
  public entren: RegistroInter[] = [];

  /* LISTA CON LOS ATRIBUTOS DE LA INTERFAZ */
  
  displayedColumns: string[] = ['id', 'fecha_y_hora', 'usuario_id', 'repeticiones'];
  usuariosSelect = new FormControl('');

  // Función para filtrar entrenamientos en base a la selección
  filterEntrenamiento(selectedValue: string) {
    
   if (selectedValue === '') {
      this.filtroEntrenamiento = this.entren;
    } else {
      const userId = Number(selectedValue); 
      // Filtrar entrenamientos en función del usuario seleccionado
      this.filtroEntrenamiento = this.entren.filter(entren => entren.usuario_id === userId);
    }
  }
  
  constructor(private dataProvider: DatosProvedorService, private entrenamientoProvider: RegistroServService) { }

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      this.usuarios = (response as DatosInter[]);
     
    })
    this.entrenamientoProvider.getResponse().subscribe((response) => {
      this.entren = (response as RegistroInter[]);
      this.filtroEntrenamiento = this.entren;
    })

    // Suscribirse a los cambios en el FormControl
    this.usuariosSelect.valueChanges.subscribe((selectedValue) => {
      if (selectedValue !== null) {
        this.filterEntrenamiento(selectedValue);
      } else {
        this.filtroEntrenamiento = this.entren;
      }
    });

  }

}
