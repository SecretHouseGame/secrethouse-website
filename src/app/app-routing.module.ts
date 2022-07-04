import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginGuard} from "./services/guard/LoginGuard";

const routes: Routes = [
	{
		path: 'game',
		loadChildren: () => import('./layout/sh/sh.module')
			.then((module) => module.ShModule),
		canActivate:[LoginGuard]
	},
	{
		path: '',
		loadChildren: () => import('./layout/sp/sp.module')
			.then((module) => module.SpModule)
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
