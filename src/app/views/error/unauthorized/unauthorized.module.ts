import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import { UnauthorizedComponent } from './unauthorized.component';

import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';
import { ErrorComponent } from '../error.component';
import { ErrorModule } from '../error.module';

const routes: Routes = [
	{path: '', component: UnauthorizedComponent},
]

@NgModule({
	declarations: [
		UnauthorizedComponent,
	],
	imports: [
		CommonModule,
    ErrorModule,
		NgxDsSecretHouseModule,
		RouterModule.forChild(routes)
	]
})

export class UnauthorizedModule {

	constructor() {
	}

	ngOnInit() {
	}
 
}


