import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./views/home/home.module')
			.then((module) => module.HomeModule)
	},
	{
		path: 'account',
		loadChildren: () => import('./views/account/account.module')
			.then((module) => module.AccountModule)
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
