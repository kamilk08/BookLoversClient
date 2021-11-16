import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { RemoveCustomShelfComponent } from './remove-custom-shelf.component';

describe('RemoveCustomShelfComponent', () => {
  let component: RemoveCustomShelfComponent;
  let fixture: ComponentFixture<RemoveCustomShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [RemoveCustomShelfComponent],
      providers: [
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: RemoveCustomShelfComponent
          }),
          deps: [NzModalService]
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveCustomShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
