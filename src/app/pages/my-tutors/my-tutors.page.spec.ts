import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyTutorsPage } from './my-tutors.page';

describe('MyTutorsPage', () => {
  let component: MyTutorsPage;
  let fixture: ComponentFixture<MyTutorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTutorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyTutorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
