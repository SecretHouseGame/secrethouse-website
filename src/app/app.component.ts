import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, Event, NavigationStart, RouterLink } from "@angular/router";
import { AppService } from './app.service';
import {filter, map} from 'rxjs/operators';
import {StoreService} from "./store/store.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	title : string = 'secrethouse-website';
	currentRoute : string = '';

	constructor( public appService: AppService, private router: Router, private storeService:StoreService) {
		// On récupère la route précédente et la nouvelle
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe((event: any) => {
			this.appService.previousUrl= this.appService.currentUrl;
			this.appService.currentUrl = event.url;
		});
	}
}
