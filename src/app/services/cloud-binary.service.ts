import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudBinaryService {
  cloudBinaryUploadPreset: string;
  cloudBinaryUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.cloudBinaryUploadPreset = 'ml_default';
    this.cloudBinaryUrl = 'https://api.cloudinary.com/v1_1/dfkrcsufm/image/upload'
  }

  sendPhoto(file) {
    let formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", this.cloudBinaryUploadPreset)
    return this.http.post(this.cloudBinaryUrl, formData);
  }


}
