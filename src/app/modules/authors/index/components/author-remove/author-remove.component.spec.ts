import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AuthorModule } from '../../../author.module';

import { AuthorRemoveComponent } from './author-remove.component';

describe('AuthorRemoveComponent', () => {
  let component: AuthorRemoveComponent;
  let fixture: ComponentFixture<AuthorRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AuthorRemoveComponent],
      providers: [
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: AuthorRemoveComponent
          }),
          deps: [NzModalService]
        }
      ]
    })
      .overrideModule(AuthorModule, { set: { entryComponents: [AuthorRemoveComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dialog result should have confirmed property set to true when user decided to remove author', () => {

    component.confirm();

    fixture.detectChanges();

    expect(component.dialogResult.confirmed).toBeTruthy();

  });

  it('dialog result should have confirmed property set to false when user decided to not remove an author', () => {

    component.cancel();

    fixture.detectChanges();

    expect(component.dialogResult.confirmed).toBeFalsy();

  });
});
