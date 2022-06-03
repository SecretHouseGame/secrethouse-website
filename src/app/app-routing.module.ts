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
		path: 'contact',
		loadChildren: () => import('./views/contact/contact.module')
			.then((module) => module.ContactModule)
	},
	{
		path: 'rules',
		loadChildren: () => import('./views/rules/rules.module')
			.then((module) => module.RulesModule)
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
