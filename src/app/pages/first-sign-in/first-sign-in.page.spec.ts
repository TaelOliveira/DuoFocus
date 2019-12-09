import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FirstSignInPage } from './first-sign-in.page';

describe('FirstSignInPage', () => {
  let component: FirstSignInPage;
  let fixture: ComponentFixture<FirstSignInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstSignInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FirstSignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
