import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';
import { ChatServerComponent } from './chat-server.component';

@NgModule({
  declarations: [
    ChatServerComponent
  ],
  imports: [
    CommonModule,
    NgxDsSecretHouseModule
  ],
	exports: [
		ChatServerComponent,
		ChatServerComponent

	]
})
export class ChatServerModule { }
