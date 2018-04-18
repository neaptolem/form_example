import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileService } from './services/profile.service';
import { AdressFormService } from './components/adress-form/adress-form.service';
import { AdressFormComponent } from './components/adress-form/adress-form.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProfileFormComponent,
    AdressFormComponent,
    ColorPickerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    ProfileService,
    AdressFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
