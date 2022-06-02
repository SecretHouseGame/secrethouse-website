import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { GameCreateComponent } from './game-create/game-create.component';

const routes: Routes = [
	{ path: 'create', component: GameCreateComponent }
]

@NgModule({
	declarations: [
		GameCreateComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class GamesModule {
}
