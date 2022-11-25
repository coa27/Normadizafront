import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComunnication } from '../../interfaces/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {

    @Input() estado!: boolean;
    @Input() nombre!: string;
    @Input() titulo!: string;
    @Output() onAction: EventEmitter<DialogComunnication> = new EventEmitter<DialogComunnication>();

    editar: FormGroup = this.fb.group({
        nombre: ['', [Validators.required]],
        color: ['', [Validators.required]],
    });

    constructor(private fb: FormBuilder) {}

    cerrar(estado: DialogComunnication){
        if(estado.estado){
            this.onAction.emit({...estado, nombre: this.editar.value["nombre"]});
            this.editar.reset();
            return;
        }
        this.onAction.emit({...estado})
    }
}