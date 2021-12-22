import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddUserPage } from './adduser.page';


describe('RegisterPage', () => {
  let component: AddUserPage;
  let fixture: ComponentFixture<AddUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
