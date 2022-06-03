import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./views/home/home.module')
			.then((module) => module.HomeModule)
	},
	{
		path: 'sh',
		loadChildren: () => import('./sh/sh.module')
			.then((module) => module.ShModule)
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
