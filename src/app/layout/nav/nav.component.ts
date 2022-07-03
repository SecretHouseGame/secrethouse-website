import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../store/store.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public storeService:StoreService) { }

  ngOnInit(): void {
  }

  get link(){
	  if(this.storeService.gameId > 0) return "/game/play/1/lobby";
	  else if(this.storeService.players.length >0) return "/game/play/1/residents"
	  else return "/game";
  }

}
