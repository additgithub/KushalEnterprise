import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EditAgentPage } from './editagent.page';


describe('RegisterPage', () => {
  let component: EditAgentPage;
  let fixture: ComponentFixture<EditAgentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAgentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAgentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
