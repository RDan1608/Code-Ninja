import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorhighlightComponent } from './components/colorhighlight/colorhighlight.component';
import { PlansComponent } from './components/plans/plans.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { CarpetasComponent } from './components/carpetas/carpetas.component';
import { CodeComponent } from './components/code/code.component';
import { ArchivosComponent } from './components/archivos/archivos.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MonacoEditorComponent } from './components/monaco-editor/monaco-editor.component';
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { CarpetaComponent } from './components/carpeta/carpeta.component';
import { PlanComponent } from './components/plan/plan.component';
import { ArchivoComponent } from './components/archivo/archivo.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ProfileComponent,
    ColorhighlightComponent,
    PlansComponent,
    SidebarComponent,
    LandingPageComponent,
    MainLayoutComponent,
    CarpetasComponent,
    CodeComponent,
    ArchivosComponent,
    CarpetaComponent,
    MonacoEditorComponent,
    PlanComponent,
    ArchivoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MonacoEditorModule,
  ],
  providers: [
    {
      provide: MONACO_PATH,
      useValue: 'https://unpkg.com/monaco-editor@0.36.1/min/vs',
    },
  
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
