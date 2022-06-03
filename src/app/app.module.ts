import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';


@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
  		FooterComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgxDsSecretHouseModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
