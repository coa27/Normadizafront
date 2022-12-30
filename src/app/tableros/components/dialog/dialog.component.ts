import { DatePipe, formatDate } from '@angular/common';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComunnication } from '../../interfaces/dialog';
import { Tarea } from '../../interfaces/tarea';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy{
    datePipe: DatePipe = new DatePipe('en-US');
    fechas: Date[] = [new Date()];

    @Input() titulo!: string;

    @Input() nombre!: string;

    @Input() tarea: Tarea | undefined;

    @Output() onAction: EventEmitter<DialogComunnication> =
        new EventEmitter<DialogComunnication>();

    editar!: FormGroup;

    tareaInfo!: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        if(this.tarea !== undefined){
            this.tareaInfo =  this.fb.group({
                nombre: [this.tarea?.nombre, [Validators.required]],
                descripcion: [this.tarea?.descripcion, [Validators.required]],
            });
        }else{
            this.editar = this.fb.group({
                nombre: ['', [Validators.required]],
                color: ['', [Validators.required]],
            });

        }
    }

    ngOnDestroy(): void {
        if(this.tarea !== undefined){
            this.tareaInfo.reset();
            this.fechas = [new Date()];
        }else{
            this.editar.reset();
        }
    }

    cerrar(estado: DialogComunnication) {
        this.onAction.emit({ estado: false });
    }

    guardar(estado: DialogComunnication) {
        //si tarea existe, significa que debel devolver la tarea
        if (this.tarea !== undefined) {
            this.onAction.emit({
                ...estado,
                nombre: this.tareaInfo.value['nombre'],
                descripcion: this.tareaInfo.value['descripcion'],
                fecha: this.fechas
            });
            this.tareaInfo.reset();
            this.fechas = [new Date()];
            return;
        }
        //si tarea no existe, signfica que el objecto a devolver es un tablero (mas bien el nombre del tablero)
        else {
            this.onAction.emit({
                ...estado,
                nombre: this.editar.value['nombre'],
            });
            this.editar.reset();
            return;
        }
    }
}
