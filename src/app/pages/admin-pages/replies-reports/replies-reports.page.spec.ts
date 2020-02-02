import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepliesReportsPage } from './replies-reports.page';

describe('RepliesReportsPage', () => {
  let component: RepliesReportsPage;
  let fixture: ComponentFixture<RepliesReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepliesReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepliesReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
