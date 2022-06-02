import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSecretsComponent } from './game-secrets.component';

describe('GameSecretsComponent', () => {
	let component: GameSecretsComponent;
	let fixture: ComponentFixture<GameSecretsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GameSecretsComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GameSecretsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
