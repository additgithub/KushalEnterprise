import { MyInquiryPage } from './myinquiry.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('HomePage', () => {
  let component: MyInquiryPage;
  let fixture: ComponentFixture<MyInquiryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInquiryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyInquiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
