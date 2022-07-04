import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Pages enfant
import { RouterModule, Routes } from "@angular/router";
import { GameCreateComponent } from './game-create/game-create.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { GameResidentsComponent } from './game-residents/game-residents.component';
import { GameRoomsComponent } from './game-rooms/game-rooms.component';
import { GameSecretsComponent } from './game-secrets/game-secrets.component';
import { ChatServerModule } from "../../chat/chat-server.module";

// Components
import { StepperComponent } from "../../components/stepper/stepper.component";
import { LobbyStepCharacterComponent } from './game-lobby/steps/lobby-step-character/lobby-step-character.component';
import { LobbyStepLobbyComponent } from './game-lobby/steps/lobby-step-lobby/lobby-step-lobby.component';
import { PlayerPortraitComponent } from "../../components/player-portrait/player-portrait.component";

const routes: Routes = [
	// TODO : Si on a pas join de game : on arrive sur créer / rejoindre une game
	{path: '', component: GameCreateComponent},
	// TODO : Si on a join une game : on est redirect dans le lobby
	{path: ':gameId/lobby', component: GameLobbyComponent},
	{path: ':gameId/residents', component: GameResidentsComponent},
	{path: ':gameId/rooms', component: GameRoomsComponent},
	{path: ':gameId/secrets', component: GameSecretsComponent},
]

@NgModule({
	declarations: [
		GameCreateComponent,
		GameLobbyComponent,
		GameResidentsComponent,
		GameRoomsComponent,
		GameSecretsComponent,
		StepperComponent,
		LobbyStepCharacterComponent,
		LobbyStepLobbyComponent,
		PlayerPortraitComponent
	],
	imports: [
		CommonModule,
		NgxSkeletonLoaderModule,
		RouterModule.forChild(routes),
		SwiperModule,
		NgxDsSecretHouseModule,
		FormsModule,
		ReactiveFormsModule,
		ChatServerModule
	],
	exports: [
		StepperComponent,
		LobbyStepCharacterComponent,
		PlayerPortraitComponent
	]
})

export class GamesModule {
}
