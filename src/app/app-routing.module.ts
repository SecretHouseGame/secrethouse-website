import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'sh',
		loadChildren: () => import('./layout/sh/sh.module')
			.then((module) => module.ShModule)
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
