import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpComponent } from "./sp.component";

const routes: Routes = [
	{
		path: '',
		component: SpComponent,
		children: [
			{
        path: '',
        loadChildren: () => import('../../views/home/home.module')
          .then((module) => module.HomeModule)
      },
      {
        path: 'unauthorized',
        loadChildren: () => import('../../views/error/unauthorized/unauthorized.module')
          .then((module) => module.UnauthorizedModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../../views/contact/contact.module')
          .then((module) => module.ContactModule)
      },
      {
        path: 'rules',
        loadChildren: () => import('../../views/rules/rules.module')
          .then((module) => module.RulesModule)
      },
      {
        path: '**', pathMatch: 'full',
        loadChildren: () => import('../../views/error/not-found/not-found.module')
          .then((module) => module.NotFoundModule)
      },
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SpRoutingModule {
}
