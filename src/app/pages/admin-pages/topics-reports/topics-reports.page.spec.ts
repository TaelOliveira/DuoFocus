import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopicsReportsPage } from './topics-reports.page';

describe('TopicsReportsPage', () => {
  let component: TopicsReportsPage;
  let fixture: ComponentFixture<TopicsReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopicsReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
