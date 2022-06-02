import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss']
})

export class ErrorComponent implements OnInit {
	@Input() code: string = "";
	@Input() title: string = "";
	@Input() img: string = "";

	constructor() { }

	ngOnInit(): void {
	}

}
