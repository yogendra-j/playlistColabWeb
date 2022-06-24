import { TestBed } from '@angular/core/testing';

import { PlaySongServiceService } from './play-song-service.service';

describe('PlaySongServiceService', () => {
  let service: PlaySongServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaySongServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
