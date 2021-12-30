import { Component, ComponentFactoryResolver, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UsuarioI } from '../../modelos/usuario.interface'
import { DataService } from 'src/app/services/data.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'
import { ResponseI } from '../../modelos/response.interface';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css'],
})
export class GestionUsuarioComponent implements OnInit {


  constructor(
    private activerouter: ActivatedRoute,
    private router: Router,
    private api: DataService,
    private cookieservice: CookieService
  ) {}

  datosUsuarios:UsuarioI;
  usuarioid = this.activerouter.snapshot.paramMap.get('id');
  editarForm = new FormGroup({
    id: new FormControl({ value: "", disabled: true }),
    name: new FormControl({ value: "", disabled: true }),
    email: new FormControl({ value: "", disabled: true }),
    rol_id: new FormControl('',[
      Validators.required,
      Validators.pattern('^[1-2]*$')
      
    ]),
  })
 
  ngOnInit(): void {
  //  let usuarioid = this.activerouter.snapshot.paramMap.get('id'); //obtenemos el id del usuario
 
    let token = this.getToken();
   this.api.getunUsuario(this.usuarioid).subscribe(data =>{
     this.datosUsuarios = data['message'];
      console.log(this.datosUsuarios);
     this.editarForm.setValue({
        'id': this.datosUsuarios.id,
        'name': this.datosUsuarios.name,
        'email': this.datosUsuarios.email,
        'rol_id': this.rol_usuario()
     });
   
    })
   
   
  }

  //obtener el token del usuario 
  getToken(){
    return this.cookieservice.get('token'); //obtenemos el token del usuario
  }

  rol_usuario(){
    if(this.datosUsuarios.rol_id == 1){
      return 'Administrador';
    }else{
       return 'Usuario';
    }
  }

  postForm(form: UsuarioI){

    Swal.fire({
      title: 'Esta seguro(a)?',
      text: "Esta acción se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Actualizado!',
          'El rol del usuario ha sido actualizado correctamente!.',
          'success'
        )
        this.api.editarUsuario(form,this.usuarioid).subscribe(data=>{
          let respuesta: ResponseI = data;
          console.log(respuesta);
          
         })
     
      }
      this.router.navigate(['header/tbl-usuarios']);
    })
 
   
    



  }

  
  refresh(): void { window.location.reload(); }

  eliminar(){
    Swal.fire({
      title: 'Estas seguro(a)?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire(
          '¡Eliminado(a)!',
          'Usuario eliminado con éxito.',
          'success'
        )
        let datos: UsuarioI= this.editarForm.value;
        this.api.eliminarUsuario(datos,this.usuarioid).subscribe(data=>{
          console.log(data); 
        })
      }
      this.router.navigate(['header/tbl-usuarios']);
    })

}
}
