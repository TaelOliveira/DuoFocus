import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorPage } from './tutor.page';

describe('TutorPage', () => {
  let component: TutorPage;
  let fixture: ComponentFixture<TutorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
