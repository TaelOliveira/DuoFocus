import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorReviewsPage } from './tutor-reviews.page';

describe('TutorReviewsPage', () => {
  let component: TutorReviewsPage;
  let fixture: ComponentFixture<TutorReviewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorReviewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorReviewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
