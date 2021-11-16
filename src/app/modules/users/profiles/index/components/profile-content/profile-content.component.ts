import { Component, OnInit, Input } from '@angular/core';
import { Sex, SEXES } from 'src/app/modules/shared/models/sexes';
import { Profile } from '../../../../../api/profiles/models/profile.model';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';

@Component({
  selector: 'profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent implements OnInit {

  @Input() reader: Reader
  @Input() email: string
  @Input() profile: Profile

  constructor() { }

  ngOnInit() {
  }

  public getSexName() {
    if (this.profile)
      return SEXES.find(f => f.id === this.profile.specification.sex).name;

    return undefined;
  }
}
