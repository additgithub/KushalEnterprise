import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddPartsPage } from './addparts.page';


describe('RegisterPage', () => {
  let component: AddPartsPage;
  let fixture: ComponentFixture<AddPartsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
