import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

	private courseReportedSource = new Subject();

	courseReported$ = this.courseReportedSource.asObservable();

	constructor() { }

	reportCourse() {
		this.courseReportedSource.next('');
	}
}
