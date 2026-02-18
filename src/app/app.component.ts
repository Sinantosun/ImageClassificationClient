import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PredictionModel } from './Models/prediction-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private readonly API_URL = 'https://localhost:7235/api/classification/predict';

  previewUrl = '';
  selectedFile: File | null = null;
  hasResult = false;
  
  predictionResult: PredictionModel = new PredictionModel();

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.selectedFile = input.files[0];
    this.previewUrl = URL.createObjectURL(this.selectedFile);
    this.hasResult = false;

    if (this.predictionResult) {
      this.predictionResult = new PredictionModel();;
    }

  }

  analyzeImage(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<PredictionModel>(this.API_URL, formData)
      .subscribe({
        next: (response: any) => {
          this.predictionResult = response.payload;
          this.hasResult = true;
        }
      });
  }
}
