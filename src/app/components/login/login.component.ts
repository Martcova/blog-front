import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formlogin: FormGroup = new FormGroup({});

  constructor(private ds:DataService, private cookie:CookieService, private router:Router,private activerouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.formlogin=new FormGroup(
      {
      email: new FormControl('',[
        Validators.required,
        Validators.email

      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]),
     
    }
    )
   
  }

  enviarLogin(){
    Swal.fire({
      title: 'Sus datos son correctos?',
      text: "Revise bien sus credenciales!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, iniciar sesión!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Correcto!',
          'Ha iniciado sesión..!!.',
          'success'
        )
        this.suscripcion();
      }
    })
        

  
  }


  suscripcion(){
    const {email, password} = this.formlogin.value
    this.ds.enviarCredenciales(email, password)
    .subscribe(response =>{
      console.log('sesion iniciada correctamente',response);
      const {token} = response;
      const {id} = response;
      const {rol_id} = response;
      this.cookie.set('rol_id',rol_id);
      this.cookie.set('id',id);
      this.cookie.set('token',token,1,'/');
      this.router.navigate(['/']);
    },
      error =>{
      console.log('error al iniciar sesion'); 
      const err = error
      this.errorSesion(err);
    })
    
  }

errorSesion(error:any){
  Swal.fire({
    icon: 'error',
    title: 'Oops!!...',
    text: 'No se pudo iniciar sesión, revisa tus credenciales!',
    
  })
  this.router.navigate(['/header/login']);
}



}
 