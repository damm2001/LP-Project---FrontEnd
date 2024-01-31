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
  mostrarFormulario: boolean = false;
  public filteredData: Libro[] = [];  // Nuevo array para almacenar resultados filtrados
  searchTerm: string = '';

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

  /*
  public filteredData: Libro[] = [];  // Nuevo array para almacenar resultados filtrados
  searchTerm: string = '';
  
  constructor(private dataProvider: DatosProvedorService, private http: HttpClient) { }

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => { 
      this.data = (response as Libro[]); 
      console.log(this.data);
    })
  }

  loadData() {
    this.dataProvider.getResponse().subscribe((response) => {
      this.data = response as Libro[];
      this.filteredData = [...this.data];  // Inicializa el array filtrado con todos los libros
    });
  }

  // Nuevo método de búsqueda
  search2() {
    if (this.searchTerm.trim() === '') {
      this.loadData();  // Si la búsqueda está vacía, cargar todos los libros
    } else {
      this.filteredData = this.data.filter(libro =>
        libro.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        libro.autor.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    console.log("Prueba: ",this.filteredData)
  }

  searchForm() {
    // Llama al método search() con los valores actuales de searchTerm
    this.search(this.searchTerm);
  }

  search(titulo: string) {
    const url = 'http://localhost:4567/api/libros/buscar/titulo/${titulo}';
    
    // Cambia la URL y la estructura de la consulta según tu configuración en el backend
  
    // Realiza la solicitud GET
    this.http.get(url).subscribe(
      (response: any) => {
        console.log('Libros encontrados:', response);
  
        // Actualiza la lista de libros filtrados con los resultados de la búsqueda
        this.filteredData = response;
  
        // Puedes realizar otras acciones si es necesario
      },
      (error) => {
        console.error('Error al buscar libros:', error);
        // Puedes manejar errores aquí
      }
    );
  }
  
  */ 

  searchForm() {
    // Llama al método search() con los valores actuales de searchTerm
    //this.search(this.searchTerm);
    console.log('Término de búsqueda:', this.searchTerm);
  }

  search() {
    console.log("Titulo a buscar: ", this.searchTerm);
    const url1 = 'http://localhost:4567/api/books/buscar/titulo/';
    const url = url1 + this.searchTerm;
    console.log("url: ",url)
    
    // Cambia la URL y la estructura de la consulta según tu configuración en el backend
  
    // Realiza la solicitud GET
    this.http.get(url).subscribe(
      (response: any) => {
        console.log('Libros encontrados:', response);
  
        // Actualiza la lista de libros filtrados con los resultados de la búsqueda
        this.filteredData = response;
        this.data = (this.filteredData as Libro[]); 
        console.log(this.data);
  
        // Puedes realizar otras acciones si es necesario
      },
      (error) => {
        console.error('Error al buscar libros:', error);
        // Puedes manejar errores aquí
      }
    );
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
