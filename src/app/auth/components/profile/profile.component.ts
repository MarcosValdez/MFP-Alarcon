/*Datos principales del componenete perfil*/

/** Para evitar errores, estar seguros de haber instalado los paquetes con npm install **/

/**Importaciones principales del componente**/
/*Importacion de las herramientas principales*/
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
/*Importacion de los servicios*/
import { CloudBinaryService }  from '../../../services/cloud-binary.service';
import { NewUsuarioService } from '../../servicios/editarperfil.service'
import { CursoService } from '../../../curso/servicios/curso.service'

/* Elementos del coponente para definir sus rutas especificas de valores */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

/* Exportaciones del componente */
export class ProfileComponent implements OnInit {
  /*Atributo principal del grupo de formularios*/
  perfilForm: FormGroup;
  /**Atributos principales que se muestran en el perfil**/
  correo: any;
  url: any;
  usuario_apellidos: any;
  usuario_id: any;
  usuario_nombre: any;
  descripcion: any;
  cursosm: any;

  /* Objeto para editar los valores del perfil, se iguala a los valores del usuario para evitar problemas 
  a la hora de editarlos */
  objeto = {
    usuario_nombre: sessionStorage.getItem("usuario_nombre"),
    usuario_apellidos: sessionStorage.getItem("usuario_apellidos"),
    correo: sessionStorage.getItem("correo"),
    url: sessionStorage.getItem("url"),
    descripcion: sessionStorage.getItem("descripcion"),
  }

  /* Variable para el cambio al presionar el boton */
  cambio: boolean;

  /* Las constantes del constructor son los datos del usuario en cuestion, obtenidos al importar las funciones
  necesarias en fin de obtener los datos */
  constructor(
    public cloudBinaryService: CloudBinaryService, 
    public newUsuarioService: NewUsuarioService, 
    public cursoService: CursoService,
    private formBuilder: FormBuilder
    ) {
      this.cambio = false;
      this.correo = sessionStorage.getItem("correo");
      this.url = sessionStorage.getItem("url");
      this.usuario_apellidos = sessionStorage.getItem("usuario_apellidos");
      this.usuario_id = sessionStorage.getItem("usuario_id");
      this.usuario_nombre = sessionStorage.getItem("usuario_nombre");
      this.descripcion = sessionStorage.getItem("descripcion");
  }

  /**En esta parte se obtienen los cursos matriculados de cada usuario**/
  /*Funcion principal de los componentes de angular*/
  ngOnInit(): void {
    /*Funcion importada que obtiene el numero de cursos en los que el usuario esta matriculado con respecto
    a su ID*/
    this.cursoService.listarCursosPorUsuario2(this.usuario_id).subscribe(rep=>{
      this.cursosm = rep["data"].length;
    })
    
    /*Funcion importada que usa al atributo formado anteriormente para definir las restricciones y validaciones
    de los input que posean el mismo nombre que el formulario*/
    this.perfilForm = this.formBuilder.group({
      /*Validaciones definidas para el input de nombre de usuario*/
      usuario_nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      /*Validaciones definidas para el input de apellidos del usuario*/
      usuario_apellidos: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      /*Validaciones definidas para el input de correo del usuario*/
      correo: [
        '',
        [
          Validators.required, 
          Validators.email, 
          Validators.maxLength(30)
        ],
      ],
      /*Validaciones definidas para el input de descripcion del usuario*/
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200)
        ]
      ],
    });
  }
  
  /*Funcion que define cuando el nombre de usuario es invalido*/
  get nombreNoValido() {
    return (
      this.perfilForm.get('usuario_nombre').invalid &&
      this.perfilForm.get('usuario_nombre').touched
    );
  }

  /*Funcion que define cuando los apellidos del usuario son invalidos*/
  get apellidoNoValido() {
    return (
      this.perfilForm.get('usuario_apellidos').invalid &&
      this.perfilForm.get('usuario_apellidos').touched
    );
  }

  /*Funcion que define cuando el correo del usuario es invalido*/
  get correoNoValido() {
    return (
      this.perfilForm.get('correo').invalid &&
      this.perfilForm.get('correo').touched
    );
  }

  /*Funcion que define cuando la descripcion del usuario es invalida*/
  get descripcionNoValido() {
    return (
      this.perfilForm.get('descripcion').invalid &&
      this.perfilForm.get('descripcion').touched
    );
  }

  /* Funcion para el cambio al presionar el boton */
  modificarDatos() {
    this.cambio = true;
  }

  /* Metodo para cambiar la imagen, donde se hace uso del CloudBinary */
  modificarImagen(event) {
    /*Se obtiene la url de la imagen en cuestion al cambiar la imagen y se guarda en la base de datos
    usando el servicio importado de la nube*/
    this.cloudBinaryService.sendPhoto(event.target.files[0]).subscribe(rep => {
      this.objeto.url = rep["url"];
    });
  }
  /* Metodo para enviar los datos y cambiar los datos de perfil */
  /** Se pueden usar mejores metodos para enviar la información a traves del servicio, como un lector de JSONm sin tener que hacerlo
   * manualmente, uno por uno, lo que significaria mejor rendimiento en la aplicacion. **/
  enviarDatos(evento){
    if (this.perfilForm.valid){
      let formData = new FormData(evento.target)
      formData.set('url',this.objeto.url)
      /* Se retorna dicho valor al usuario en cuestion */
      this.newUsuarioService.editarUsuario(formData).subscribe((rep) => {
        this.correo = rep['user1'][0]['correo'];
        this.url = rep['user1'][0]['url'];
        this.usuario_apellidos = rep['user1'][0]['usuario_apellidos'];
        this.usuario_id = rep['user1'][0]['usuario_id'];
        this.usuario_nombre = rep['user1'][0]['usuario_nombre'];
        this.descripcion = rep['user1'][0]['descripcion'];

        sessionStorage.setItem('usuario_id', rep['user1'][0]['usuario_id']);
        sessionStorage.setItem(
          'usuario_apellidos',
          rep['user1'][0]['usuario_apellidos']
        );
        sessionStorage.setItem(
          'usuario_nombre',
          rep['user1'][0]['usuario_nombre']
        );
        sessionStorage.setItem('correo', rep['user1'][0]['correo']);
        sessionStorage.setItem('url', rep['user1'][0]['url']);
        sessionStorage.setItem('descripcion', rep['user1'][0]['descripcion']);
        console.log(rep);
      });
      this.cambio = false;
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
