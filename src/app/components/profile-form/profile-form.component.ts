import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AdressFormService } from './../adress-form/adress-form.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  public profileForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    homeAddress: this.adressFormService.adreessFormGenerate,
    workAddress: this.adressFormService.adreessFormGenerate,
    phones: this.fb.array(['']),
    color: ['', Validators.required]
  });

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    private adressFormService: AdressFormService,
    private profileService: ProfileService) {
    this.profileForm.valueChanges
      .subscribe((res) => console.log(res));
    this.profileForm.get('phones').valueChanges
      .subscribe((res) => console.log(res));
  }

  ngOnInit() {
    this.profileService.getData()
      .subscribe(data => {
        this.profileForm.patchValue(data);
        this.profileForm.setControl('phones', this.fb.array(data.phones));
      });
  }

  public addPhone() {
    const phoneArr = this.profileForm.get('phones') as FormArray;
    phoneArr.push(new FormControl(''));
  }

  public formSubmit() {
    console.log(this.profileForm.value);
    this.profileForm.reset();
  }

  get phonesArr(): FormArray {
    return this.profileForm.get('phones') as FormArray;
  }
}
