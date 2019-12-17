import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorProfilePage } from './tutor-profile.page';

describe('TutorProfilePage', () => {
  let component: TutorProfilePage;
  let fixture: ComponentFixture<TutorProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
