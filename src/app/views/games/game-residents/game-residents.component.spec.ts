import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResidentsComponent } from './game-residents.component';

describe('GameResidentsComponent', () => {
	let component: GameResidentsComponent;
	let fixture: ComponentFixture<GameResidentsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GameResidentsComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GameResidentsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
