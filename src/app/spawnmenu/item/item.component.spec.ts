import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpawnmenuItemComponent } from './item.component';

describe('SpawnmenuItemComponent', () => {
  let component: SpawnmenuItemComponent;
  let fixture: ComponentFixture<SpawnmenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpawnmenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpawnmenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
