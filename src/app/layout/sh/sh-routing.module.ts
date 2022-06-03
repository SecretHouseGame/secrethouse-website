import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShComponent } from "./sh.component";

const routes: Routes = [
	{
		path: '',
		component: ShComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('../../views/dashboard/dashboard.module')
					.then((module) => module.DashboardModule)
			},
			{
				path: 'account',
				loadChildren: () => import('../../views/account/account.module')
					.then((module) => module.AccountModule)
			},
			{
				path: 'play',
				loadChildren: () => import('../../views/games/games.module')
					.then((module) => module.GamesModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShRoutingModule {
}
