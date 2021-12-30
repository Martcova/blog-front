import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { TblUsuariosComponent } from './tbl-usuarios/tbl-usuarios.component';
import { DataTablesModule } from 'angular-datatables';
import { TblComentariosComponent } from './tbl-comentarios/tbl-comentarios.component';
import { TblArticulosComponent } from './tbl-articulos/tbl-articulos.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AgregaArticuloComponent } from './agrega-articulo/agrega-articulo.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { GestionUsuarioComponent } from './gestion-usuario/gestion-usuario.component';
import { GestionArticulosComponent } from './gestion-articulos/gestion-articulos.component';
import { VistaArticuloComponent } from './vista-articulo/vista-articulo.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    InicioComponent,
    RegisterComponent,
    TblUsuariosComponent,
    TblComentariosComponent,
    TblArticulosComponent,
    AgregaArticuloComponent,
    GestionUsuarioComponent,
    GestionArticulosComponent,
    VistaArticuloComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    
  
   
    
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    TblUsuariosComponent,
    TblComentariosComponent,
    TblArticulosComponent,
    AgregaArticuloComponent
  ]
  
})
export class ComponentsModule {   }
