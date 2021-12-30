import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CargarScriptsService} from './cargar-scripts.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { InjectSessionInterceptor } from './interceptors/inject-session.interceptor';





@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    DataTablesModule,
    HttpClientModule,


  ],

  providers: [
    CargarScriptsService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectSessionInterceptor,
      multi: true
    }
    
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
