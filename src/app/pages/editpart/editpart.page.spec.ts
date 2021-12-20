import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EditPartsPage } from './editpart.page';


describe('RegisterPage', () => {
  let component: EditPartsPage;
  let fixture: ComponentFixture<EditPartsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
