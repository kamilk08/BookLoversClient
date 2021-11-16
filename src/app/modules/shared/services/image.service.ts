import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ImageService {

  private _encodedImage: string;
  public get encodedImage() {
    return this._encodedImage;
  }

  public set encodedImage(value: string) {
    this._encodedImage = value;
  }

  constructor() { }

  toEncodedImage(blob: Blob, onError?: (reject: any) => any, onLoaded?: (success: any) => any) {
    if (!blob) return;

    let fs = new FileReader();
    fs.onload = () => this._encodedImage = fs.result.toString();
    if (onError)
      fs.onerror = (e) => onError(e);
    if (onLoaded)
      fs.onloadend = () => onLoaded(true);

    fs.readAsDataURL(blob);
  }


}
