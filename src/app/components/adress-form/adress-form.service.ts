import { Inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AdressFormService {

  constructor(@Inject(FormBuilder) private _fb: FormBuilder) { }

  public get adreessFormGenerate(): FormGroup {
    return this._fb.group({
      street: ['', Validators.required],
      city: ['', Validators.compose([this.validateCity])],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  public validateCity(formControl: AbstractControl): ValidationErrors | null {
    if (!formControl.value) {
      return null;
    }
    return ['London', 'Paris', 'Lviv', 'Tokyo', 'New-York', 'Ternopil']
      .map(item => item.toLowerCase()).includes(formControl.value.toLowerCase().trim()) ? null :
      { noCity: true };
  }
}
