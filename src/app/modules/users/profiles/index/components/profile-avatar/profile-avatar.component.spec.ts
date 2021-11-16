import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CookiesService } from 'src/app/modules/auth/services/cookies.service';
import { TokenService } from 'src/app/modules/auth/services/token.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { ProfileAvatarComponent } from './profile-avatar.component';

describe('ProfileAvatarComponent', () => {
  let component: ProfileAvatarComponent;
  let fixture: ComponentFixture<ProfileAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [ProfileAvatarComponent],
      providers: [ImageService, AuthService, TokenService, CookiesService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('WHEN_USER_IS_NOT_LOGGED_IN_AND_THERE_WAS_NO_ERROR', () => {
    it('then readonly avatar template should be visible', () => {

      const userId = 1;

      spyOnProperty(component.authService, 'userId').and.returnValue(userId);

      component.readerId = undefined;

      fixture.detectChanges();

      const elem = fixture.debugElement.query(By.css('.profile-avatar__image'));

      expect(elem).not.toBeNull();

    })
  });

  describe('WHEN_USER_IS_NOT_LOGGED_IN_AND_THERE_WAS_AN_ERROR', () => {
    it('then error template shoulde be visible', () => {

      const userId = 1;

      spyOnProperty(component.authService, 'userId').and.returnValue(userId);

      component.readerId = undefined;

      fixture.detectChanges();

      component.loadAvatarError$.next(true);

      fixture.detectChanges();

      const elem: HTMLElement = fixture.debugElement.query(By.css('.profile-avatar__image')).nativeElement;

      const flag = elem.classList.contains('error');

      expect(flag).toBeTruthy();
    });
  });

});
