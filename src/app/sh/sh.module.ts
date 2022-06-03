import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDsSecretHouseModule } from "ngx-ds-secret-house";

import { ShRoutingModule } from './sh-routing.module';
import { ShComponent } from './sh.component'


@NgModule({
	declarations: [
		ShComponent
	],
	imports: [
		CommonModule,
		NgxDsSecretHouseModule,
		ShRoutingModule
	]
})
export class ShModule {
}
