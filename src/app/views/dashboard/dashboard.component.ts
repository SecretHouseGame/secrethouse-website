import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	gameCode: FormControl = new FormControl('', [
		Validators.required
	])

	constructor (public httpService:HttpService, public router:Router) {
	}

	ngOnInit (): void {
	}

	isGameCodeValid () {
		return this.gameCode.valid
	}

	createGame(){
		this.httpService.createGame(2,222,30).subscribe(()=>{
			this.router.navigate(['/game/play']);
		})

	}

	joinGame () {
		if (this.isGameCodeValid()) {
			this.httpService.getGame(this.gameCode.value).subscribe(()=>{
				this.router.navigate(['/game/play']);
			})
		}
	}
}
