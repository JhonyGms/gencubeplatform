import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotacionesusuarioComponent } from './votacionesusuario.component';

describe('VotacionesusuarioComponent', () => {
  let component: VotacionesusuarioComponent;
  let fixture: ComponentFixture<VotacionesusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotacionesusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotacionesusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
