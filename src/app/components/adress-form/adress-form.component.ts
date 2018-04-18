import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adress-form',
  templateUrl: './adress-form.component.html',
  styleUrls: ['./adress-form.component.css']
})
export class AdressFormComponent implements OnInit {
  @Input() public form: FormGroup;
  @Input() public legend: string;
  constructor() { }

  ngOnInit() {
  }

}
