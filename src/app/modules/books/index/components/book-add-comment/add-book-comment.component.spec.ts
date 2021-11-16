import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AddBookCommentComponent } from './add-book-comment.component';
import { AddBookCommentService } from './services/add-book-comment.service';

describe('AddBookCommentComponent', () => {
  let component: AddBookCommentComponent;
  let fixture: ComponentFixture<AddBookCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AddBookCommentComponent],
      providers: [AddBookCommentService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('post', () => {
    it('reviewPostChange should emit new value when submit button was clicked', () => {

      let spy = spyOn(component.reviewPostChange, 'emit');

      component.pageService.addReviewForm.get('review').setValue('review');
      component.pageService.addReviewForm.get('spoilerComment').setValue(false);
      component.pageService.addRatingForm.get('stars').setValue(3);

      fixture.detectChanges();

      let debugButtonElement = fixture.debugElement.query(By.css('.add-book-comment__post'));

      let submitButton: HTMLButtonElement = debugButtonElement.nativeElement;

      submitButton.click();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    })
  });

  describe('clear', () => {
    it('should clear form from values that were provided by user', () => {
      component.pageService.addReviewForm.get('review').setValue('review');
      component.pageService.addReviewForm.get('spoilerComment').setValue(false);
      component.pageService.addRatingForm.get('stars').setValue(3);

      fixture.detectChanges();

      const debugButtonElement = fixture.debugElement.query(By.css('.add-book-comment__clear'));

      const submitButton: HTMLButtonElement = debugButtonElement.nativeElement;

      submitButton.click();

      fixture.detectChanges();

      const textAreaDebugElement = fixture.debugElement.query(By.css('.add-book-comment__input'));

      const textAreaElement:HTMLInputElement = textAreaDebugElement.nativeElement;

      expect(textAreaElement.value).toBe('');

    })
  })
});
