import { AddFavouriteAuthorModalComponent } from "./components/add-favourite-author-modal/add-favourite-author-modal.component";
import { AddFavouriteAuthorModalCover } from "./components/add-favourite-author-modal/components/add-favourite-author-modal-image/add-favourite-author-modal-cover.component";
import { AddFavouriteBookModalComponent } from "./components/add-favourite-book-modal/add-favourite-book-modal.component";
import { AddFavouriteBookModalCover } from "./components/add-favourite-book-modal/components/add-favourite-book-modal-cover/add-favourite-book-modal-cover.component";
import { ChangeEmailModalComponent } from "./components/change-email-modal/change-email-modal.component";
import { ChangePasswordModalComponent } from "./components/change-password-modal/change-password-modal.component";
import { FavouriteAuthorImage } from "./components/favourite-author-image/favourite-author-image.component";
import { FavouriteBookCover } from "./components/favourite-book-cover/favourite-book-cover.component";
import { ReaderFollowerAvatarComponent } from "./components/follower-avatar/reader-follower-avatar.component";
import { ManageProfileModalComponent } from "./components/manage-profile-modal/manage-profile-modal.component";
import { ProfileAvatarComponent } from "./components/profile-avatar/profile-avatar.component";
import { ProfileContainerComponent } from "./components/profile-container/profile-container.component";
import { ProfileContentComponent } from "./components/profile-content/profile-content.component";
import { ProfileStatisticsItemComponent } from "./components/profile-statistics-item/profile-statistics-item.component";
import { ProfileComponent } from "./profile.component";

export const components: any[] = [
  ProfileAvatarComponent, ProfileContentComponent,
  ProfileStatisticsItemComponent,
  ProfileContainerComponent, ReaderFollowerAvatarComponent,
  ProfileComponent, ManageProfileModalComponent, AddFavouriteAuthorModalComponent,
  AddFavouriteBookModalComponent, FavouriteBookCover, FavouriteAuthorImage, AddFavouriteBookModalCover,
  AddFavouriteAuthorModalCover, ChangeEmailModalComponent, ChangePasswordModalComponent
];

export const entryComponents: any[] = [
  ManageProfileModalComponent,
  AddFavouriteBookModalComponent,
  AddFavouriteAuthorModalComponent,
  ChangePasswordModalComponent,
  ChangeEmailModalComponent
]
