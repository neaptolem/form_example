import { Inject, Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Injectable()
export class AdressFormService {

  constructor(@Inject(FormBuilder) private _fb: FormBuilder) { }

  public get adreessFormGenerate(): FormGroup {
    return this._fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }
}
