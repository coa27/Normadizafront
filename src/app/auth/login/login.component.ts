import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    login: FormGroup = new FormGroup({
        'username': new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required])
    })

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {}

    acceder(){
        if(!this.login.valid){
            return;
        }

        this.authService.iniciarSesion({emailOrUsuario: this.login.value["username"], password: this.login.value["password"]})
            .subscribe( data => {
                this.router.navigate(['/tableros/'])
                sessionStorage.setItem("token", data.token)
            })
    }

    registrarse(){
        this.router.navigate(['/auth/registro'])
    }
}
