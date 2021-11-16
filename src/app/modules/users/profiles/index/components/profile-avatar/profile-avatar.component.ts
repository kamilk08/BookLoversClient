import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AvatarChange } from 'src/app/modules/shared/models/avatar-change.event';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { MesssagesFacade } from 'src/app/modules/shared/store/messages/message.facade';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss'],
  providers: [ImageService, MesssagesFacade]
})
export class ProfileAvatarComponent implements OnInit {

  private _show: boolean = false;

  get show() {
    return this._show;
  }

  public readonly loadAvatarError$: Subject<boolean> = new Subject<boolean>();

  public avatarUrl = () => `${environment.upload}/avatars/${this.readerId}`;

  @Input() readerId: number
  @Output() avatarChange: EventEmitter<AvatarChange> = new EventEmitter<AvatarChange>();
  @Output() removeAvatarChange: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public readonly imageService: ImageService,
    public readonly authService: AuthService,
    public readonly messagesFacade: MesssagesFacade
  ) { }

  ngOnInit() {
  }

  changeAvatar(event: any) {
    this._show = false;
    this.loadAvatarError$.next(false);

    if (event.target.files.length > 0) {
      const image = event.target.files[0] as File;

      this.imageService.toEncodedImage(image,
        (error) => console.log(this.messagesFacade.showFaliureMessage('Invalid image'), error),
        (success) => this.avatarChange.emit({ avatar: this.imageService.encodedImage, fileName: image.name }));
    }
  }

  removeAvatar() {
    this._show = true;
    this.imageService.encodedImage = '';
    this.removeAvatarChange.emit();
  }

  onError() {
    this.loadAvatarError$.next(true);
  }

}
