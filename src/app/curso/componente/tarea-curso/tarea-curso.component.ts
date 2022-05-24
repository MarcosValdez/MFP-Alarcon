import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarea } from '../../modelo/tarea';
import { TareaService } from '../../servicios/tarea.service';
import { NuevoMaterialComponent } from '../nuevo-material/nuevo-material.component';
import { VerEntregaTareaComponent } from '../ver-entrega-tarea/ver-entrega-tarea.component';

@Component({
  selector: 'app-tarea-curso',
  templateUrl: './tarea-curso.component.html',
  styleUrls: ['./tarea-curso.component.css'],
})
export class TareaCursoComponent implements OnInit {
  @Input() usuarioProfesor: boolean;
  @Input() cursoId: number;

  tareas: Tarea[];
  tareaFiltro: string;
  constructor(
    private modalService: NgbModal,
    private tareaService: TareaService
  ) {}

  ngOnInit(): void {
    this.listarTareas(this.cursoId);
  }

  entregar(id: number) {
    return id;
  }

  /**
   * Función para abrir un modal para la creacion de una nueva tarea
   */
  openModal() {
    const modalRef = this.modalService.open(NuevoMaterialComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      tarea: true,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        //intencional
        this.listarTareas(this.cursoId);
      },
      (reason) => {
        //intencional
      }
    );
  }

  /**
   * Función para abrir un modal con las entregas realizadas de una tarea
   * @param id Identificador de la tarea
   */
  openModalEntregas(id: number) {
    const modalRef = this.modalService.open(VerEntregaTareaComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      tarea: id,
      editarTarea: false,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        //intencional
      },
      (reason) => {
        //intencional
      }
    );
  }

  /**
   * Función para listar las tareas de un curso
   * @param id Identificadoe del curso
   */
  listarTareas(id: number) {
    this.tareaService.listarTareaCurso(id).subscribe((x) => {
      this.tareas = x['tareas'];
    });
  }

  /**
   * Función para abrir un modal para editar la tarea
   * @param tarea Objeto con la información de una tarea
   */
  editarTarea(tarea: Tarea) {
    const modalRef = this.modalService.open(NuevoMaterialComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      tarea: true,
      editarTarea: true,
      contenido: tarea,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        this.listarTareas(this.cursoId);
      },
      (reason) => {
        //intencional
      }
    );
  }

  /* Añadir defincion de la funcion para guardar los archivos */
}
