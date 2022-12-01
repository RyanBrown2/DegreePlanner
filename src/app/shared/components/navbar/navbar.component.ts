import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	
	extraIcon: string = '';

	showExtra: boolean = false;
	extraHTML: string = '';

	constructor(
		public authService: AuthService,
	) { }

	ngOnInit(): void {
	
	}


}
