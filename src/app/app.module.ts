import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		RouterModule,
		BrowserModule,
		AppRoutingModule,
		NgxDsSecretHouseModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
