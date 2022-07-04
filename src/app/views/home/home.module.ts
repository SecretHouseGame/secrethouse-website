import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: HomeComponent}
]

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgxDsSecretHouseModule,
		ReactiveFormsModule
	]
})
export class HomeModule {
}
