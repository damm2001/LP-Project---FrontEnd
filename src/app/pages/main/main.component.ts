import { Component } from '@angular/core';
//Importación de la interfaz
import { Libro} from 'src/app/interfaces/libro';
//Importación del servicio
import { DatosProvedorService } from 'src/app/providers/datos-provedor.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';



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
  libroaCambiar : Libro = { titulo: '', autor: '', edicion: '', disponibilidad:false, valoracion: 0 };
  mostrarFormulario: boolean = false;
  public filteredData: Libro[] = [];  // Nuevo array para almacenar resultados filtrados
  searchTerm: string = '';
  mostrarValoracion: boolean = false;
  public listaLibros: Libro[] = [];  // Nuevo array para almacenar resultados filtrados
  libroSeleccionado: Libro | null = null;
  libroSeleccionadoValoracion: Libro | null = null;
  //Inyección de dependencia del servicio
  constructor(private dataProvider: DatosProvedorService, private http: HttpClient) { }

  //Ejecución de la petición y suscripción de la respuesta
  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => { 
      this.data = (response as Libro[]); 
      console.log(this.data);
    })
  }

  search() {

    console.log("Titulo a buscar: ", this.searchTerm);
    const url = `http://localhost:4567/api/books/buscar?termino=${encodeURIComponent(this.searchTerm)}`;
    console.log("url: ",url);

    // Realiza la solicitud GET
    this.http.get(url).subscribe(
      (response: any) => {
        console.log('Libros encontrados:', response);
        // Actualiza la lista de libros filtrados con los resultados de la búsqueda
        this.filteredData = response;
        this.data = (this.filteredData as Libro[]); 
        console.log(this.data);
      },
      (error) => {
        console.error('Error al buscar libros:', error);
      }
    );

  }

  agregarLibro() {
    console.log('Clic en agregar libro');
    this.mostrarFormulario = true;
    console.log('mostrarFormulario:', this.mostrarFormulario);
  }

  editarLibro(){

  }

  eliminarLibro(){

  }

  valorarLibro(){
    console.log('Clic en hacer reserva');
    this.obtenerListaLibrosDisponibles();

    console.log('mostrarFormulario:');
    this.mostrarValoracion= true;
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

  guardarValoracion(){
    this.editarValoracionLibro(this.libroaCambiar.titulo);
    this.mostrarValoracion = false;
    this.libroSeleccionadoValoracion = null;
    this.libroaCambiar.titulo = '';  // Limpiar el estudiante seleccionado
    this.libroaCambiar.valoracion = 0;  // Limpiar el libro seleccionado
    this.obtenerListaLibros();
  }


  // Nueva función para obtener la lista actualizada de libros
  private obtenerListaLibros() {
    this.dataProvider.getResponse().subscribe((response) => { 
      this.data = (response as Libro[]); 
      console.log(this.data);
    })
  }

  obtenerListaLibrosDisponibles() {
    const url = 'http://localhost:4567/api/books'; // Cambia la URL según tu configuración

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


  editarValoracionLibro(titulo: string) {
    const tituloCodificado = encodeURIComponent(titulo);
    const urlX = 'http://localhost:4567/api/books/';
    const url= urlX + tituloCodificado;
    console.log("URL DEL LIBRO A CAMBIAR: ", url);

    // Datos a enviar en el cuerpo de la solicitud
    const datosActualizar = {
      titulo: this.libroSeleccionadoValoracion?.titulo,
      autor: this.libroSeleccionadoValoracion?.autor,
      edicion: this.libroSeleccionadoValoracion?.edicion,
      disponibilidad: this.libroSeleccionadoValoracion?.disponibilidad,
      valoracion: this.libroaCambiar?.valoracion
    };


    // Realiza la solicitud PUT
    this.http.put(url, datosActualizar).subscribe(
      (response: any) => {
        console.log('Valoracion actualizada:', response);

        // Puedes realizar otras acciones si es necesario
      },
      (error) => {
        console.error('Error al actualizar la valoracion del libro:', error);
        // Puedes manejar errores aquí
      }
    );
  }

  seleccionarLibro(event: any) {

    const libroSeleccionadoTitulo = event.target.value;
    this.libroSeleccionadoValoracion = this.listaLibros.find(libro => libro.titulo === libroSeleccionadoTitulo) || null;

    // Ahora 'libroSeleccionado' contiene el objeto completo del libro seleccionado
    console.log('Libro seleccionado:', this.libroSeleccionadoValoracion);

    // Puedes realizar otras acciones si es necesario con el libro seleccionado
  }

  

  
}
