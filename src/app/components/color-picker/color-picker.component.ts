import { ColorHelper } from './color.helper';
import { RGBInterface, HSLInterface } from './color.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent implements OnInit, ControlValueAccessor {
  public disabled = false;

  public colorForm: FormGroup = this.fb.group({
    rgb: this.fb.group({
      red: [0, Validators.compose([Validators.min(0), Validators.max(255)])],
      green: [0, Validators.compose([Validators.min(0), Validators.max(255)])],
      blue: [0, Validators.compose([Validators.min(0), Validators.max(255)])]
    }),
    hsl: this.fb.group({
      hue: [0, Validators.compose([Validators.min(0), Validators.max(360)])],
      saturation: [0, Validators.compose([Validators.min(0), Validators.max(100)])],
      lightness: [0, Validators.compose([Validators.min(0), Validators.max(100)])],
    })
  });

  public color: Observable<string> =
    this.colorForm.get('rgb').valueChanges
      .map(ColorHelper.toRGB);

  constructor(@Inject(FormBuilder) private fb: FormBuilder) { }

  ngOnInit() {
    this.color.subscribe((res) => this.onChange(res));
  }

  onChange = (color: string) => { };
  onTouched = () => { };

  writeValue(color: string): void {
    if (color) {
      const [red, green, blue] = color.split('(')[1].split(')')[0].split(',');
      this.colorForm.patchValue({ rgb: { red, green, blue } });
      this.onChange(ColorHelper.toRGB(this.colorForm.value.rgb));
    }
  }

  registerOnChange(fn: (color: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
