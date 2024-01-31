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

  displayedColumns: string[] = ['nombre', 'correo', 'nombre_usuario'];
  public data: Estudiante[] = [];

  constructor(private dataProvider: RegistroServService) {}

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      this.data = response as Estudiante[];
      console.log(this.data);
    });
  }
}

