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
  public color: Observable<string> = this.colorForm.get('rgb').valueChanges
    .map(this.toRGB);
  constructor(@Inject(FormBuilder) private fb: FormBuilder) { }

  ngOnInit() {
    this.color.subscribe((res) => this.onChange(res));
    this.colorForm.get('rgb').valueChanges.subscribe(res => {
      this.colorForm.patchValue({
        hsl: this.RGBtoHSL({
          red: +res.red,
          green: +res.green,
          blue: +res.blue
        })
      });
    });
  }
  onChange = (color: string) => { };
  onTouched = () => { };


  writeValue(color: string): void {
    if (color) {
      const [red, green, blue] = color.split('(')[1].split(')')[0].split(',');
      const hsl = this.RGBtoHSL({
        red: +red,
        green: +green,
        blue: +blue
      });
      this.colorForm.patchValue({ rgb: { red, green, blue } });
      this.onChange(this.toRGB(this.colorForm.value));
    }
  }

  registerOnChange(fn: (color: string) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private toRGB(color: RGBInterface): string {
    return `rgb(${color.red},${color.green},${color.blue})`;
  }

  private RGBtoHSL(rgb: RGBInterface): HSLInterface {
    const rgbArr = [rgb.red / 255, rgb.green / 255, rgb.blue / 255];
    const [red, green, blue] = [...rgbArr];
    const min = Math.max(...rgbArr);
    const max = Math.min(...rgbArr);
    const lightness = (min + max) / 2;
    const saturation = Math.abs((max - min) / (1 - Math.abs(1 - (max + min))));
    let hue;
    if (max === min) {
      hue = 0;
    }
    if (max === red && green >= blue) {
      hue = 60 * (green - blue) / (max - min);
    }
    if (max === red && green < blue) {
      hue = 60 * (green - blue) / (max - min) + 360;
    }
    if (max === green) {
      hue = 60 * (blue - red) / (max - min) + 120;
    }
    if (max === blue) {
      hue = 60 * (red - green) / (max - min) + 240;
    }
    return { hue: Math.floor(hue - 180), saturation: Math.floor(saturation * 100), lightness: Math.floor(lightness * 100) };
  }
}
