import { TestBed } from '@angular/core/testing';

import { UploadPictureService } from './upload-picture.service';

describe('UploadPictureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadPictureService = TestBed.get(UploadPictureService);
    expect(service).toBeTruthy();
  });
});
