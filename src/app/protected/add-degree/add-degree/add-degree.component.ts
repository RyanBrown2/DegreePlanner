import { Component, OnInit } from '@angular/core';

import { Degree } from 'src/app/core/services/degrees/degree';
import { DegreeService } from 'src/app/core/services/degrees/degree.service';

@Component({
  selector: 'app-add-degree',
  templateUrl: './add-degree.component.html',
  styleUrls: ['./add-degree.component.scss']
})
export class AddDegreeComponent implements OnInit {

  constructor(
    private degreeService: DegreeService
  ) { }

  ngOnInit(): void {
  }

}
