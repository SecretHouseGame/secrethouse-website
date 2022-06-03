import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	gameCode: FormControl = new FormControl('')

	constructor () {
	}

	ngOnInit (): void {
	}

}
