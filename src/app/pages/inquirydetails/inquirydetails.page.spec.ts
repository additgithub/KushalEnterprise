import { InquiryDetailsPageModule } from './inquirydetails.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('HomePage', () => {
  let component: InquiryDetailsPageModule;
  let fixture: ComponentFixture<InquiryDetailsPageModule>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryDetailsPageModule ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InquiryDetailsPageModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
