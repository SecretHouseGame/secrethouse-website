import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { GameCreateComponent } from './game-create/game-create.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';

const routes: Routes = [
	{ path: 'create', component: GameCreateComponent },
	{ path: 'g/:gameId/lobby', component: GameCreateComponent }
]

@NgModule({
	declarations: [
		GameCreateComponent,
		GameLobbyComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class GamesModule {
}
