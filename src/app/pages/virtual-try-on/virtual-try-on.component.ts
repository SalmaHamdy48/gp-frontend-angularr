import { Component } from '@angular/core';

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

  // Flag to show result card
  showResult = false;

  onProfileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.profilePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onItemUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.itemPreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

 tryItOn() {
  if (this.profilePreview && this.itemPreview && this.selectedCategory) {
    this.showResult = true;
  }
}
}