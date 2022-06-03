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
	{
		path: 'unauthorized',
		loadChildren: () => import('./views/error/unauthorized/unauthorized.module')
			.then((module) => module.UnauthorizedModule)
	},
	{
		path: '**', pathMatch: 'full',
		loadChildren: () => import('./views/error/not-found/not-found.module')
			.then((module) => module.NotFoundModule)
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
