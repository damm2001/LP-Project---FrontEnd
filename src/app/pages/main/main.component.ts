import { Component } from '@angular/core';
//Importación de la interfaz
import { Libro} from 'src/app/interfaces/libro';
//Importación del servicio
import { DatosProvedorService } from 'src/app/providers/datos-provedor.service';
import { HttpClient } from '@angular/common/http';



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
  //LOGICA AGREGAR NUEVO LIBRO
  nuevoLibro: Libro = { titulo: '', autor: '', edicion: '', disponibilidad:false, valoracion: 0 };
  mostrarFormulario: boolean = false;

  //Inyección de dependencia del servicio
  constructor(private dataProvider: DatosProvedorService, private http: HttpClient) { }

  //Ejecución de la petición y suscripción de la respuesta
  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => { 
      this.data = (response as Libro[]); 
      console.log(this.data);
    })
  }

  agregarLibro() {
    console.log('Clic en agregar libro');
    this.mostrarFormulario = true;
    console.log('mostrarFormulario:', this.mostrarFormulario);
  }


  guardarLibro() {
    // Puedes enviar la información del nuevo libro al backend aquí usando HTTP POST
    const url = 'http://localhost:4567/api/books'; // Cambia la URL según tu configuración

    // También puedes agregar lógica de validación antes de enviar los datos al backend
    console.log('Guardando libro:', this.nuevoLibro);

    // Realiza la solicitud POST
    this.http.post(url, this.nuevoLibro).subscribe(
      (response) => {
        console.log('Libro guardado exitosamente:', response);

        // Después de guardar, puedes limpiar el formulario y ocultar el formulario nuevamente
        this.nuevoLibro = { titulo: '', autor: '', edicion: '', disponibilidad: false, valoracion: 0 };
        console.log('Libro nuevo:', this.nuevoLibro);
        this.mostrarFormulario = false;

        this.obtenerListaLibros();
      },
      (error) => {
        console.error('Error al guardar el libro:', error);
        // Puedes manejar errores aquí
      }
    );
  }


  // Nueva función para obtener la lista actualizada de libros
  private obtenerListaLibros() {
    this.dataProvider.getResponse().subscribe((response) => { 
      this.data = (response as Libro[]); 
      console.log(this.data);
    })
  }

  

  
}
