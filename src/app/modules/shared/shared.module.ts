import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  UserOutline, LockOutline, HomeOutline, GooglePlusOutline,
  FacebookOutline, TwitterOutline, CheckOutline, BookFill, EditFill,
  NumberOutline, PlusCircleOutline, PlusOutline, StarFill, StarOutline, GithubFill, GithubOutline, CaretRightFill, CaretRightOutline
} from '@ant-design/icons-angular/icons';

import { ChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MomentModule } from 'ngx-moment';
import * as fromNgZorro from 'ng-zorro-antd';
import { ImageService } from './services/image.service';
import { CommonModule } from '@angular/common';
import { ModalService } from './services/modal.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageEffects } from './store/messages/message.effects';
import { sharedModuleReducer } from './store';

import * as fromIndex from './components/index';
import { MesssagesFacade } from './store/messages/message.facade';
import { ExternalLinkDirective } from './common/external-link.directive';

const icons: IconDefinition[] = [UserOutline, LockOutline,
  HomeOutline, GooglePlusOutline, FacebookOutline, TwitterOutline, CheckOutline, BookFill, EditFill,
  NumberOutline, PlusCircleOutline, PlusOutline,
  StarFill, StarOutline,
  GithubFill, GithubOutline,
  CaretRightFill, CaretRightOutline
];

const antDesignModules = [
  fromNgZorro.NzFormModule,
  fromNgZorro.NzInputModule,
  fromNgZorro.NzButtonModule,
  fromNgZorro.NzIconModule,
  fromNgZorro.NzCheckboxModule,
  fromNgZorro.NzSpinModule,
  fromNgZorro.NzDividerModule,
  fromNgZorro.NzDropDownModule,
  fromNgZorro.NzAvatarModule,
  fromNgZorro.NzUploadModule,
  fromNgZorro.NzToolTipModule,
  fromNgZorro.NzTimelineModule,
  fromNgZorro.NzModalModule,
  fromNgZorro.NzDatePickerModule,
  fromNgZorro.NzSelectModule,
  fromNgZorro.NzMessageModule,
  fromNgZorro.NzAutocompleteModule,
  fromNgZorro.NzCollapseModule,
  fromNgZorro.NzRateModule,
  fromNgZorro.NzBreadCrumbModule,
  fromNgZorro.NzTagModule,
  fromNgZorro.NzProgressModule,
  fromNgZorro.NzCommentModule,
  fromNgZorro.NzPopoverModule,
  fromNgZorro.NzSwitchModule,
  fromNgZorro.NzSkeletonModule,
  fromNgZorro.NzPaginationModule,
  fromNgZorro.NzCarouselModule,
  fromNgZorro.NzSliderModule,
  fromNgZorro.NzPopconfirmModule,
  fromNgZorro.NzRateModule
]


@NgModule({
  imports: [
    ...antDesignModules,
    CommonModule,
    ChartsModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('sharedModule', sharedModuleReducer),
    EffectsModule.forFeature([MessageEffects])
  ],
  declarations: [...fromIndex.components, ExternalLinkDirective],
  exports: [
    ...antDesignModules,
    ...fromIndex.components,
    ChartsModule,
    MomentModule,
    ExternalLinkDirective
  ],
  providers: [
    ImageService,
    ModalService,
    MessageEffects,
    MesssagesFacade,
    { provide: fromNgZorro.NZ_ICONS, useValue: icons }
  ]
})
export class SharedModule {

}
