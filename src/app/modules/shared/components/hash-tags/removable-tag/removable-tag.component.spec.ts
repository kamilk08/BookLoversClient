import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzTagModule } from 'ng-zorro-antd';

import { RemovableTagComponent } from './removable-tag.component';

describe('RemovableTagComponent', () => {
  let component: RemovableTagComponent;
  let fixture: ComponentFixture<RemovableTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzTagModule, BrowserAnimationsModule],
      declarations: [RemovableTagComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovableTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('triggering click event on tag box should emit RemoveTagChange event', () => {

    let spy = spyOn(component.remove, 'emit');

    const tagBox = fixture.debugElement.query(By.css('.tag-item__remove-box'));

    tagBox.triggerEventHandler('click', {});

    expect(spy).toHaveBeenCalled();

  });

});
