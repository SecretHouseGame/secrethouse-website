import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { GameCreateComponent } from './game-create/game-create.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { GameResidentsComponent } from './game-residents/game-residents.component';
import { GameRoomsComponent } from './game-rooms/game-rooms.component';
import { GameSecretsComponent } from './game-secrets/game-secrets.component';
import { GameBuzzComponent } from './game-buzz/game-buzz.component';
import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';

const routes: Routes = [
	// TODO : Si on a pas join de game : on arrive sur créer / rejoindre une game
	{path: '', component: GameCreateComponent},
	// TODO : Si on a join une game : on est redirect dans le lobby
	//{path: ':gameId/lobby', component: GameLobbyComponent},
	{path: 'lobby', component: GameLobbyComponent},
	{path: ':gameId/residents', component: GameResidentsComponent},
	{path: ':gameId/rooms', component: GameRoomsComponent},
	{path: ':gameId/secrets', component: GameSecretsComponent},
	{path: ':gameId/buzz', component: GameBuzzComponent},
]

@NgModule({
	declarations: [
		GameCreateComponent,
		GameLobbyComponent,
		GameResidentsComponent,
		GameRoomsComponent,
		GameSecretsComponent,
		GameBuzzComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgxDsSecretHouseModule,
	]
})
export class GamesModule {
}
