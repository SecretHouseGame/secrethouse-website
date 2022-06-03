import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { NgxDsSecretHouseModule } from "ngx-ds-secret-house";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
	{ path: '', component: DashboardComponent }
]

@NgModule({
	declarations: [
		DashboardComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgxDsSecretHouseModule
	]
})
export class DashboardModule {
}
