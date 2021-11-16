import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { environment } from 'src/environments/environment';
import { AddAuthorImageComponent } from './add-author-image.component';


describe('AddAuthorImageComponent', () => {
  let component: AddAuthorImageComponent;
  let fixture: ComponentFixture<AddAuthorImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      providers: [ImageService],
      declarations: [AddAuthorImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuthorImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('authorImageUrl should be valid when authorId is provided', () => {
    const authorId = 1;

    component.authorId = authorId;

    const url = component.authorImageUrl();

    expect(url).toBe(`${environment.upload}/authors/${authorId}`)
  });

  describe('author image input change', () => {
    describe('when input is not provided', () => {
      it('should show default image box', () => {
        let debugElement = fixture.debugElement.query(By.css('.author-image__text-box'));

        expect(debugElement).toBeDefined();
      })
    })

    describe('when input is provided', () => {
      it('should hide default box and show img element with provided image', () => {

        let debugElement = fixture.debugElement.query(By.css('.author-image__image'));
        expect(debugElement).toBeNull();

        spyOn(component, 'onImageSelect').and.callFake(() => console.log('fake on image select'));
        spyOnProperty(component.imageService, 'encodedImage').and.returnValue('encoded image');

        component.onImageSelect(new Event('change'));

        expect(component.onImageSelect).toHaveBeenCalled();

      });
    })
  })

});
