import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Pages enfant
import { RouterModule, Routes } from "@angular/router";
import { PlayerPortraitComponent } from "../../components/player-portrait/player-portrait.component";
import { GameCreateComponent } from './game-create/game-create.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { GameResidentsComponent } from './game-residents/game-residents.component';
import { GameRoomsComponent } from './game-rooms/game-rooms.component';
import { GameSecretsComponent } from './game-secrets/game-secrets.component';
import { GameBuzzComponent } from './game-buzz/game-buzz.component';
import { ChatServerModule } from "../../chat/chat-server.module";
import { GameCharacterComponent } from "./game-character/game-character.component";

// Components
import { StepperComponent } from "../../components/stepper/stepper.component";
import { LobbyStepParamsComponent } from './game-lobby/steps/lobby-step-params/lobby-step-params.component';
import { LobbyStepCharacterComponent } from './game-lobby/steps/lobby-step-character/lobby-step-character.component';
import { LobbyStepLobbyComponent } from './game-lobby/steps/lobby-step-lobby/lobby-step-lobby.component';

const routes: Routes = [
	// TODO : Si on a pas join de game : on arrive sur créer / rejoindre une game
	{path: '', component: GameCreateComponent},
	// TODO : Si on a join une game : on est redirect dans le lobby
	{path: ':gameId/lobby', component: GameLobbyComponent},
	{path: ':gameId/residents', component: GameResidentsComponent},
	{path: ':gameId/character', component: GameCharacterComponent},
	{path: ':gameId/rooms', component: GameRoomsComponent},
	{path: ':gameId/secrets', component: GameSecretsComponent},
	{path: ':gameId/buzz', component: GameBuzzComponent},
]

@NgModule({
	declarations: [
		GameCreateComponent,
		GameLobbyComponent,
		GameResidentsComponent,
		GameCharacterComponent,
		GameRoomsComponent,
		GameSecretsComponent,
		GameBuzzComponent,
		StepperComponent,
		LobbyStepParamsComponent,
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
		LobbyStepParamsComponent,
		LobbyStepCharacterComponent,
		PlayerPortraitComponent
	]
})

export class GamesModule {
}
