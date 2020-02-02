import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentChatsPage } from './student-chats.page';

describe('StudentChatsPage', () => {
  let component: StudentChatsPage;
  let fixture: ComponentFixture<StudentChatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentChatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
