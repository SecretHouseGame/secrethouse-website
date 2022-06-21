import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from './contact.component';
import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: ContactComponent }
]

@NgModule({
	declarations: [
		ContactComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgxDsSecretHouseModule,
		RouterModule.forChild(routes)
	]
})
export class ContactModule {
}
