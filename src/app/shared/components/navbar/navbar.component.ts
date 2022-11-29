import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	@Input() extraIcon: string = '';
	@Output() extraClicked = new EventEmitter();

	showExtra: boolean = false;
	extraHTML: string = '';

	constructor(
		public authService: AuthService
	) { }

	ngOnInit(): void {
		if (this.extraIcon !== '') {
			this.showExtra = true;
			this.extraHTML = `<i class="bi ${this.extraIcon}"></i>`;
		}
	}

	onExtraClick() {
		this.extraClicked.emit();
	}

}
