import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TblUsuariosComponent } from './components/tbl-usuarios/tbl-usuarios.component';
import { TblComentariosComponent } from './components/tbl-comentarios/tbl-comentarios.component';
import { TblArticulosComponent } from './components/tbl-articulos/tbl-articulos.component';
import { AgregaArticuloComponent } from './components/agrega-articulo/agrega-articulo.component';
import { GestionUsuarioComponent } from './components/gestion-usuario/gestion-usuario.component';
import { SessionGuard } from './guards/session.guard';
import { RolesGuard } from './guards/roles.guard';
import { GestionArticulosComponent } from './components/gestion-articulos/gestion-articulos.component';
import { VistaArticuloComponent } from './components/vista-articulo/vista-articulo.component';


const routes: Routes = [
 { path:'', component:InicioComponent},
 { path:'header/login', component:LoginComponent},
 { path:'header/register', component:RegisterComponent},
 {path:'inicio/vista-articulo/:id', component:VistaArticuloComponent},

 { path:'header/tbl-usuarios', 
 component:TblUsuariosComponent, 
 data:{
role:'admin'
 },
 canActivate:[SessionGuard,RolesGuard]

},


 { path:'header/tbl-comentarios', component:TblComentariosComponent,
data:{
role:'admin'
},
canActivate:[SessionGuard,RolesGuard]},



 { path:'header/tbl-articulos', component:TblArticulosComponent,
data:{
role:'admin'
},
canActivate:[SessionGuard,RolesGuard]},


 { path:'header/tbl-articulos/agrega-articulo', component:AgregaArticuloComponent,
data:{
role:'admin'
},
canActivate:[SessionGuard,RolesGuard]},


 { path:'header/tbl-usuarios/gestion-usuario/:id', component:GestionUsuarioComponent,
data:{
  role:'admin'
},
canActivate:[SessionGuard,RolesGuard]},


 { path:'header/tbl-articulos/gestion-articulos/:id', component:GestionArticulosComponent,
data:{
  role:'admin'
},
canActivate:[SessionGuard,RolesGuard]},
 


];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
