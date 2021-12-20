import { AddMachinePage } from './addmachine.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('HomePage', () => {
  let component: AddMachinePage;
  let fixture: ComponentFixture<AddMachinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMachinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddMachinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
