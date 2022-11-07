import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Degree } from 'src/app/core/services/degrees/degree';
import { DegreeService } from 'src/app/core/services/degrees/degree.service';

@Component({
  selector: 'app-add-degree',
  templateUrl: './add-degree.component.html',
  styleUrls: ['./add-degree.component.scss']
})
export class AddDegreeComponent implements OnInit {

  public addDegreeForm: FormGroup;
  constructor(
    private degreeService: DegreeService,
    private formBuilder: FormBuilder
  ) {
    this.addDegreeForm = this.formBuilder.group({
      name: new FormControl(''),
      prefix: new FormControl(''),
      majorReq: new FormControl(''),
      mascReq: new FormControl(''),
      hssaReq: new FormControl(''),
      techReq: new FormControl(''),
      freeReq: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  addDegree() {
    const name: string = this.addDegreeForm.get('name')?.value;
    const prefix = this.addDegreeForm.get('prefix')?.value;
    const majorReq = this.addDegreeForm.get('majorReq')?.value;
    const mascReq = this.addDegreeForm.get('mascReq')?.value;
    const hssaReq = this.addDegreeForm.get('hssaReq')?.value;
    const techReq = this.addDegreeForm.get('techReq')?.value;
    const freeReq = this.addDegreeForm.get('freeReq')?.value;
    
    const id = name.toLowerCase().split(' ').join('-');

    const degree = {id: id, name: name, prefix: prefix, credits: {
      major: majorReq,
      masc: mascReq,
      hssa: hssaReq,
      tech: techReq,
      free: freeReq
    }} as Degree;

    this.degreeService.addDegree(degree);

  }

}
