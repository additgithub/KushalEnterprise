import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('HomePage', () => {
  let component: OTPVerificationPage;
  let fixture: ComponentFixture<OTPVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OTPVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OTPVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
