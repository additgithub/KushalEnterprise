import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EditMachinePage } from './editmachine.page';


describe('HomePage', () => {
  let component: EditMachinePage;
  let fixture: ComponentFixture<EditMachinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMachinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditMachinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
