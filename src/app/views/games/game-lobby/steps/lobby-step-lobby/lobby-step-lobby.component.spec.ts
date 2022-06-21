import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyStepLobbyComponent } from './lobby-step-lobby.component';

describe('LobbyStepLobbyComponent', () => {
	let component: LobbyStepLobbyComponent;
	let fixture: ComponentFixture<LobbyStepLobbyComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LobbyStepLobbyComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LobbyStepLobbyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
