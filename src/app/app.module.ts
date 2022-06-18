import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		RouterModule,
		BrowserModule,
		AppRoutingModule,
		NgxDsSecretHouseModule,
        HttpClientModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
