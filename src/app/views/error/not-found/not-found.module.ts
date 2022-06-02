import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import { NotFoundComponent } from './not-found.component';

import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';
import { ErrorComponent } from '../error.component';
import { ErrorModule } from '../error.module';

const routes: Routes = [
	{path: '', component: NotFoundComponent},
]

@NgModule({
	declarations: [
		NotFoundComponent,
	],
	imports: [
		CommonModule,
		ErrorModule,
		NgxDsSecretHouseModule,
		RouterModule.forChild(routes)
	]
})

export class NotFoundModule {

	constructor() {
	}

	ngOnInit() {
	}
 
}
