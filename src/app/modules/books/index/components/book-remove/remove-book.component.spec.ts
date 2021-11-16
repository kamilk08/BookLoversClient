import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RemoveBookComponent } from './remove-book.component';


describe('AuthorRemoveComponent', () => {
  let component: RemoveBookComponent;
  let fixture: ComponentFixture<RemoveBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [RemoveBookComponent],
      providers: [
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: RemoveBookComponent
          }),
          deps: [NzModalService]
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
