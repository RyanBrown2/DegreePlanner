import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-credit-list',
	templateUrl: './credit-list.component.html',
	styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit, OnChanges {

	@Input() id: string = '';
	@Input() title: string = '<title>';
	@Input() major: number = 0;
	@Input() masc: number = 0; // math and science
	@Input() hssa: number = 0;
	@Input() tech: number = 0;
	@Input() free: number = 0;

	total = 0;

	constructor() { }

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.total = this.major + this.masc
			+ this.hssa + this.tech + this.free;
	}

}
