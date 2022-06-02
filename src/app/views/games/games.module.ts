import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { GameCreateComponent } from './game-create/game-create.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { GameResidentsComponent } from './game-residents/game-residents.component';
import { GameRoomsComponent } from './game-rooms/game-rooms.component';
import { GameSecretsComponent } from './game-secrets/game-secrets.component';

const routes: Routes = [
	{path: 'create', component: GameCreateComponent},
	{path: 'g/:gameId/lobby', component: GameLobbyComponent},
	{path: 'g/:gameId/residents', component: GameResidentsComponent},
	{path: 'g/:gameId/rooms', component: GameRoomsComponent},
	{path: 'g/:gameId/secrets', component: GameSecretsComponent}
]

@NgModule({
	declarations: [
		GameCreateComponent,
		GameLobbyComponent,
		GameResidentsComponent,
		GameRoomsComponent,
		GameSecretsComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class GamesModule {
}
