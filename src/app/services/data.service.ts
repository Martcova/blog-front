import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioI } from '../modelos/usuario.interface';
import { Observable } from 'rxjs';
import { ResponseI } from '../modelos/response.interface';
import { ArticuloI } from '../modelos/articulo.interface';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
url :string = "http://127.0.0.1/blog/public/api/"
  constructor(private http: HttpClient, private cookie:CookieService) { }

//***************************************************************** */
//********* ENDPOINTS DE USUARIOS ********************************* */
  //metodo registro de usuario c:
  public post (url:string, body: any){
    return this.http.post(url, body);
  }
    
  //metodo todos los usuarios (vista)
  getUsuarios(){
    return this.http.get(this.url+"users");
  }

  //metodo un solo usuario
  getunUsuario(id):Observable<UsuarioI>{
    let direccion = this.url + "users/" + id;
    return this.http.get<UsuarioI>(direccion);
  }

  //metodo login c:
  enviarCredenciales(email:string, password:string): Observable<any>{
    const body ={
      email,
      password
    }
  return  this.http.post(`${this.url}login`,body);
  }

showUsuario(id:number){
  return this.http.get<any[]>(`${this.url}users/+${id}`);
}

//metodo para editar usuario
editarUsuario(form:UsuarioI,id:any):Observable<ResponseI>{
let direccion = this.url + "users/" + id;
return this.http.put<ResponseI>(direccion,form);
}

//metodo para eliminar usuario
eliminarUsuario(form:UsuarioI,id:any):Observable<ResponseI>{
  let direccion = this.url + "users/" + id;
  let options ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body:form
  }
 return this.http.delete<ResponseI>(direccion,options);
} 

//***************************************************************** */

//********* ENDPOINT CERRAR SESION ********************************* */

public cerrarSesion (){
  
    return this.http.get(this.url+"logout");
  
}

///***************************************************************** */

//********* ENDPOINTS DE ARTICULOS ********************************* */
public agregaArticulo (url:string, body: any ){
  return this.http.post(url, body);
}

getunArticulo(id):Observable<ArticuloI>{
  let direccion = this.url + "articulos/" + id;
  return this.http.get<ArticuloI>(direccion);
}

editarArticulo(form:ArticuloI,id:any):Observable<ResponseI>{
  let direccion = this.url + "articulos/" + id;
  return this.http.put<ResponseI>(direccion,form);
  }

  eliminarArticulo(form:ArticuloI,id:any):Observable<ResponseI>{
    let direccion = this.url + "articulos/" + id;
    let options ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:form
    }
   return this.http.delete<ResponseI>(direccion,options);
  } 



  
}
