import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { CoreModule } from './core/core.module';
import { AuthService } from './core/services/auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { CourseSearchComponent } from './features/course-search/course-search.component';

// Features

@NgModule({
	declarations: [
		AppComponent,
  CourseSearchComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireDatabaseModule,
		SharedModule
		// CoreModule
	],
	providers: [ AuthService ],
	bootstrap: [AppComponent]
})
export class AppModule { }
