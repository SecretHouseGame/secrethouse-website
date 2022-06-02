import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBuzzComponent } from './game-buzz.component';

describe('GameBuzzComponent', () => {
	let component: GameBuzzComponent;
	let fixture: ComponentFixture<GameBuzzComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GameBuzzComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GameBuzzComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
