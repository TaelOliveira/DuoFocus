import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeATutorPage } from './be-a-tutor.page';

describe('BeATutorPage', () => {
  let component: BeATutorPage;
  let fixture: ComponentFixture<BeATutorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeATutorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeATutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
