import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/courses/course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
  }

}
