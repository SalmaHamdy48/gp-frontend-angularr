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

    formData.append('personImage', this.profileFile);
    formData.append('clothImage', this.itemFile);
    formData.append('category', this.selectedCategory);

    this.vtonService.createVton(formData).subscribe({

      next: (res: any) => {
        console.log(res);

        this.resultImage = res.resultImage;

        // this.resultImage = 'data:image/png;base64,' + res.image;

        this.showResult = true;
      },

      error: (err : any) => {
        console.error('Error:', err);
      }
    });
  }
}
}