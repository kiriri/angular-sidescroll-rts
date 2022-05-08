import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpawnmenuComponent } from './spawnmenu.component';

describe('SpawnmenuComponent', () => {
  let component: SpawnmenuComponent;
  let fixture: ComponentFixture<SpawnmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpawnmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpawnmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
