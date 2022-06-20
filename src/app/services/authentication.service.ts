import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../interfaces/account';
import { LoginDTO } from '../interfaces/dto/login.dto';
import { RegisterDTO } from '../interfaces/dto/register.dto';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, public httpService: HttpService) { }

	/** Connexion */
	public login(loginDTO: LoginDTO): Observable<boolean> {
		console.log(loginDTO);
		return this.httpClient.post<boolean>(`${this.httpService.apiUrl}/login`, loginDTO);
	}

	/** Inscription */
	public register(registerDTO: RegisterDTO): Observable<boolean> {
		console.log(registerDTO);
		return this.httpClient.post<boolean>(`${this.httpService.apiUrl}/register`, registerDTO);
	}
}
