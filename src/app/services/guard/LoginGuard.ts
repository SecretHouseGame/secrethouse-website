import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {StoreService} from "../../store/store.service";
import {Observable} from "rxjs";

@Injectable({
	providedIn:"root"
})
export class LoginGuard implements CanActivate {
	connected:boolean = false;
	constructor(private storeService: StoreService, private router: Router) {
		this.storeService.isConnected().subscribe((data)=>{
			this.connected = data;
		})
	}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean>|Promise<boolean>|boolean {
		if(!this.connected) this.router.navigate([""]);
		return true;
	}
}
