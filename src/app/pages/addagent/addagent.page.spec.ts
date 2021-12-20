import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddAgentPage } from './addagent.page';


describe('RegisterPage', () => {
  let component: AddAgentPage;
  let fixture: ComponentFixture<AddAgentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAgentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAgentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
