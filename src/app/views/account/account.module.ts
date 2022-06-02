import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from './account.component';
import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: AccountComponent }
]

@NgModule({
	declarations: [
		AccountComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgxDsSecretHouseModule,
		ReactiveFormsModule
	]
})
export class AccountModule {
}
