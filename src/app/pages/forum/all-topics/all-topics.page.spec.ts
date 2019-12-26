import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllTopicsPage } from './all-topics.page';

describe('AllTopicsPage', () => {
  let component: AllTopicsPage;
  let fixture: ComponentFixture<AllTopicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTopicsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllTopicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
