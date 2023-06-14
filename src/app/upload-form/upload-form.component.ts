import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.uploadForm = this.formBuilder.group({
      file: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.http.post('https://localhost:7022/api/files/upload', formData)
        .subscribe(
          (res) => {
            console.log(res);
            // Handle the response if necessary
          },
          (error: HttpErrorResponse) => {
            console.log('An error occurred:', error);
            // Handle the error or display it to the user
          }
        );
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0] as File;
    }
  }
}
