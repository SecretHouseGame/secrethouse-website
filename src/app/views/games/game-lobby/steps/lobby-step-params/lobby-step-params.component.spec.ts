import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyStepParamsComponent } from './lobby-step-params.component';

describe('LobbyStepParamsComponent', () => {
	let component: LobbyStepParamsComponent;
	let fixture: ComponentFixture<LobbyStepParamsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LobbyStepParamsComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LobbyStepParamsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
