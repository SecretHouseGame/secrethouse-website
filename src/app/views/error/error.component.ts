import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss']
})

export class ErrorComponent implements OnInit {
	@Input() code: string = "";
	@Input() title: string = "";
	@Input() img: string = "";

	constructor(private _location: Location) { }

	ngOnInit(): void {
	}

	returnPreviousPage() {
		this._location.back();
	}

}
