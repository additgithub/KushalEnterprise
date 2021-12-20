import { MachineListPage } from './machinelist.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('HomePage', () => {
  let component: MachineListPage;
  let fixture: ComponentFixture<MachineListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MachineListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
