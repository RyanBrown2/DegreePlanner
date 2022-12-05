import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

	private courseReportedSource = new Subject<string>();

	courseReported$ = this.courseReportedSource.asObservable();

	constructor() { }

	reportCourse(message: string) {
		this.courseReportedSource.next(message);
	}
}
