import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDsSecretHouseModule } from "ngx-ds-secret-house";

import { SpRoutingModule } from './sp-routing.module';
import { SpComponent } from './sp.component'

import { NavComponent } from '../../layout/nav/nav.component';
import { FooterComponent } from '../../layout/footer/footer.component';


@NgModule({
  declarations: [
    SpComponent,
		NavComponent,
  	FooterComponent,
  ],
  imports: [
    CommonModule,
    NgxDsSecretHouseModule,
    SpRoutingModule
  ]
})

export class SpModule { }

