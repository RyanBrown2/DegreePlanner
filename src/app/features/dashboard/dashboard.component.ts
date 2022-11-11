import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	listTitle = 'Title';

	degreeReq = {
		'title': 'Computer Science Requirements',
		'major': 64,
		'masc': 43,
		'hssa': 37,
		'tech': 28,
		'free': 20
	}
	
	degreeCur = {
		'title': 'Current Credits',
		'major': 64,
		'masc': 43,
		'hssa': 37,
		'tech': 28,
		'free': 2
	}

	constructor() { }

	ngOnInit(): void {
	}
}
