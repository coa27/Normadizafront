import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
    registro: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.required]],
        usuario: ['', [Validators.minLength(4), Validators.required]],
        password: ['', [Validators.minLength(4), Validators.required]],
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {}

    registroUsuario() {
        if (!this.registro.valid) {
            return;
        }

        this.authService.registrarUsuario({
            nombre: this.registro.value['usuario'],
            contrasenia: this.registro.value['password'],
            email: this.registro.value['email'],
        }).subscribe();
    }

    iniciarSesion() {
        this.router.navigate(['/auth/']);
    }
}
