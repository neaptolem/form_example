import { AdressFormService } from './../adress-form/adress-form.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

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
    private adressFormService: AdressFormService) { }

  ngOnInit() {
  }

  public formSubmit() { }


}
