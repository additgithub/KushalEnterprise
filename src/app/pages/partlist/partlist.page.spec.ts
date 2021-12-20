import { PartListPage } from './partlist.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


describe('HomePage', () => {
  let component: PartListPage;
  let fixture: ComponentFixture<PartListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
