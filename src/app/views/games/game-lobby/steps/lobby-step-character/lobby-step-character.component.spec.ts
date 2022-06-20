import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyStepCharacterComponent } from './lobby-step-character.component';

describe('LobbyStepCharacterComponent', () => {
	let component: LobbyStepCharacterComponent;
	let fixture: ComponentFixture<LobbyStepCharacterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LobbyStepCharacterComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LobbyStepCharacterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
