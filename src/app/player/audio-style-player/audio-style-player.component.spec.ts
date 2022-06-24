import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioStylePlayerComponent } from './audio-style-player.component';

describe('AudioSylePlayerComponent', () => {
  let component: AudioStylePlayerComponent;
  let fixture: ComponentFixture<AudioStylePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioStylePlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioStylePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
