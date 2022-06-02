import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { NgxDsSecretHouseModule } from 'ngx-ds-secret-house';


@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
		NgxDsSecretHouseModule
  ],
  exports: [
    ErrorComponent
  ]
})
export class ErrorModule { }
