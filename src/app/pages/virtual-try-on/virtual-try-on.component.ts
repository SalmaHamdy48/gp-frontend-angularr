import { Component } from '@angular/core';
import { VtonService } from 'src/app/shared/services/vton/vton.service';

@Component({
  selector: 'app-virtual-try-on',
  templateUrl: './virtual-try-on.component.html',
  styleUrls: ['./virtual-try-on.component.scss']
})
export class VirtualTryOnComponent {
  activeTab = 'upload';
  profilePreview: string | null = null;
  itemPreview: string | null = null;
  selectedCategory: string = '';
  profileFile!: File;
  itemFile!: File;
  resultImage: string = '';
categoryMap: any = {
  dress: 'dresses',
  top: 'upper_body',
  bottom: 'lower_body',
  shoes: 'shoes'
};
  // Flag to show result card
  showResult = false;

  constructor(private vtonService: VtonService) {}

  onProfileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileFile = file; 
      const reader = new FileReader();
      reader.onload = () => this.profilePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }
  onItemUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.itemFile = file;

      const reader = new FileReader();
      reader.onload = () => this.itemPreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

tryItOn() {

  if (this.profileFile && this.itemFile && this.selectedCategory) {

    const formData = new FormData();
    const backendCategory = this.categoryMap[this.selectedCategory];

    formData.append('person_image', this.profileFile);
    formData.append('cloth_image', this.itemFile);
    formData.append('category', backendCategory);

    // 1️⃣ إرسال الصور
    this.vtonService.createVton(formData).subscribe({

      next: () => {

        console.log("Processing started...");

        // 2️⃣ نستنى شوية لأن الموديل بيشتغل في الخلفية
        setTimeout(() => {

          // 3️⃣ نجيب الصورة الناتجة
          this.vtonService.getVtonData().subscribe((blob: Blob) => {

            const imageUrl = URL.createObjectURL(blob);

            // الصورة الناتجة من الموديل
            this.resultImage = imageUrl;

            // اظهار النتيجة
            this.showResult = true;

          });

        }, 8000); // استنى 8 ثواني (حسب سرعة الموديل)

      },

      error: (err: any) => {
        console.error('Error:', err);
      }

    });

  }
}
}