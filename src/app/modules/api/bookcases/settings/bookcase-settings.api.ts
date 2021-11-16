import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { ChangeSettings } from './models/change-settings.model';
import { CHANGE_BOOKCASE_SETTINGS } from './bookcase-settings.urls';

@Injectable()
export class BookcaseSettingsApi {

  constructor(private http: HttpClient) { }

  changeBookcaseOptions(model: ChangeSettings) {
    return this.http.put(CHANGE_BOOKCASE_SETTINGS, model,
      { headers: DEFAULT_HEADERS() });
  }
}
