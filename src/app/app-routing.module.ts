import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./views/home/home.module')
			.then((module) => module.HomeModule)
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./views/dashboard/dashboard.module')
			.then((module) => module.DashboardModule)
	},
	{
		path: 'account',
		loadChildren: () => import('./views/account/account.module')
			.then((module) => module.AccountModule)
	},
	{
		path: 'contact',
		loadChildren: () => import('./views/contact/contact.module')
			.then((module) => module.ContactModule)
	},
	{
		path: 'games',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: 'games',
		loadChildren: () => import('./views/games/games.module')
			.then((module) => module.GamesModule)
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
