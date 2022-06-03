import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent, NavigationStart } from "@angular/router";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title : string = 'secrethouse-website';
	displayNav : boolean = true;
	currentRoute : string = '';

	constructor(private router: Router) {
		this.router.events
		.subscribe(
		  (event: NavigationEvent) => {
			if(event instanceof NavigationStart) {
			  if(event.url == "/") this.displayNav = false;
			}
		});
	}
}
