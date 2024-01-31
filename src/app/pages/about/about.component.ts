import { Component } from '@angular/core';
//Importación de la interfaz
import { EstudianteLibro} from 'src/app/interfaces/estudianteLibro';
//Importación del servicio
import { EjerciciosSerService  } from 'src/app/providers/ejercicios-ser.service';
//IMPORTACION PARA LOS ESTUDIANTES Y LIBROS
import {Estudiante} from 'src/app/interfaces/estudiante';
import { Libro} from 'src/app/interfaces/libro';
import { HttpClient } from '@angular/common/http';




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
  constructor(private dataProvider: EjerciciosSerService, private http: HttpClient ) { }

  nuevaReserva: EstudianteLibro = {estudiante: '', libro: ''};

  mostrarReserva: boolean = false;

  public listaEstudiantes: Estudiante[] = [];  // Nuevo array para almacenar resultados filtrados
  public listaLibros: Libro[] = [];  // Nuevo array para almacenar resultados filtrados
  libroSeleccionado: Libro | null = null;

  

  //Ejecución de la petición y suscripción de la respuesta
  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => { 
      this.data = (response as EstudianteLibro[]); 
      console.log(this.data);
    })
  }


  hacerReserva() {
  console.log('Clic en hacer reserva');
  this.obtenerListaEstudiantes();
  this.obtenerListaLibrosDisponibles();

  this.mostrarReserva= true;
  console.log('mostrarFormulario:');
  }

  guardarReserva(){
    //console.log(this.nuevaReserva);
    this.editarDispLibro(this.nuevaReserva.libro);
    // Puedes enviar la información del nuevo libro al backend aquí usando HTTP POST
    const url = 'http://localhost:4567/api/studentsbooks'; // Cambia la URL según tu configuración

    // Realiza la solicitud POST
    this.http.post(url, this.nuevaReserva).subscribe(
      (response) => {
        console.log('Reserva guardada exitosamente:', response);

        // Después de guardar, puedes limpiar el formulario y ocultar el formulario nuevamente
        this.libroSeleccionado = null;
        this.nuevaReserva.estudiante = '';  // Limpiar el estudiante seleccionado
        this.nuevaReserva.libro = '';  // Limpiar el libro seleccionado
        this.mostrarReserva = false;

        this.actualizarReservas();
      },
      (error) => {
        console.error('Error al guardar la reserva:', error);
        // Puedes manejar errores aquí
      }
    );
  }

  actualizarReservas(){
    this.dataProvider.getResponse().subscribe((response) => { 
      this.data = (response as EstudianteLibro[]); 
      console.log(this.data);
    })
  }

  

  

  
  obtenerListaEstudiantes() {
    const url = 'http://localhost:4567/api/students'; // Cambia la URL según tu configuración

    // Realiza la solicitud GET
    this.http.get(url).subscribe(
      (response: any) => {
        console.log('Estudiantes obtenidos:', response);

        // Actualiza la lista de estudiantes con la respuesta del servidor
        this.listaEstudiantes = response;

        // Puedes realizar otras acciones si es necesario
      },
      (error) => {
        console.error('Error al obtener la lista de estudiantes:', error);
        // Puedes manejar errores aquí
      }
    );
  }

  obtenerListaLibrosDisponibles() {
    const url = 'http://localhost:4567/api/books/disponibilidad/true'; // Cambia la URL según tu configuración

    // Realiza la solicitud GET
    this.http.get(url).subscribe(
      (response: any) => {
        console.log('Libros obtenidos:', response);

        // Actualiza la lista de estudiantes con la respuesta del servidor
        this.listaLibros = response;

        // Puedes realizar otras acciones si es necesario
      },
      (error) => {
        console.error('Error al obtener la lista de libros:', error);
        // Puedes manejar errores aquí
      }
    );
  }




  editarDispLibro(titulo: string) {
    const tituloCodificado = encodeURIComponent(titulo);
    const urlX = 'http://localhost:4567/api/books/';
    const url= urlX + tituloCodificado;
    console.log("URL DEL LIBRO A CAMBIAR: ", url);

    // Datos a enviar en el cuerpo de la solicitud
    const datosActualizar = {
      titulo: this.libroSeleccionado?.titulo,
      autor: this.libroSeleccionado?.autor,
      edicion: this.libroSeleccionado?.edicion,
      disponibilidad: false // Cambia esto según tus necesidades
    };


    // Realiza la solicitud PUT
    this.http.put(url, datosActualizar).subscribe(
      (response: any) => {
        console.log('Disponibilidad actualizada:', response);

        // Puedes realizar otras acciones si es necesario
      },
      (error) => {
        console.error('Error al actualizar la disponibilidad del libro:', error);
        // Puedes manejar errores aquí
      }
    );
  }

  seleccionarLibro(event: any) {

    const libroSeleccionadoTitulo = event.target.value;
    this.libroSeleccionado = this.listaLibros.find(libro => libro.titulo === libroSeleccionadoTitulo) || null;

    // Ahora 'libroSeleccionado' contiene el objeto completo del libro seleccionado
    console.log('Libro seleccionado:', this.libroSeleccionado);

    // Puedes realizar otras acciones si es necesario con el libro seleccionado
  }
  

}
