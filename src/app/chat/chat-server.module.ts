import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';
import { ChatServerComponent } from './chat-server.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ChatServerComponent
  ],
    imports: [
        CommonModule,
        NgxDsSecretHouseModule,
        FormsModule
    ],
	exports: [
		ChatServerComponent,
		ChatServerComponent

	]
})
export class ChatServerModule { }
