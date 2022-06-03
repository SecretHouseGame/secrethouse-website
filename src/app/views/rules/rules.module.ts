import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { RulesComponent } from './rules.component';

const routes: Routes = [
	{ path: '', component: RulesComponent }
]

@NgModule({
	declarations: [
		RulesComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class RulesModule {
}
