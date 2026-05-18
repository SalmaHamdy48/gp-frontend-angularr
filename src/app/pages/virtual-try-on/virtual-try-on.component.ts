import { Component } from '@angular/core';
import { VtonService } from 'src/app/shared/services/vton/vton.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service'; 
import { RecommendationService } from 'src/app/shared/services/recommendation/recommendation.service';

@Component({
  selector: 'app-virtual-try-on',
  templateUrl: './virtual-try-on.component.html',
  styleUrls: ['./virtual-try-on.component.scss']
})
export class VirtualTryOnComponent {

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
  activeTab: 'upload' | 'closet' = 'upload';
  profileReady = false;

closetItems: any[] = [];
selectedClosetItem: any = null;

userId: string = '';

  constructor(private vtonService: VtonService, private authService: AuthService, private recommendationService: RecommendationService) {}

ngOnInit() {
  this.authService.getCurrentUser().subscribe(res => {
    this.userId = res.id;

    this.loadCloset(); // 👈 هنا الصح
  });
}
loadCloset() {
  if (!this.userId) return;

  this.recommendationService.getClosetItems(this.userId).subscribe(res => {
    const items = res.items || [];

    this.closetItems = items.map((i: any) => ({
      ...i,
      image: i.url // 👈 مهم جدًا (مش image_url)
    }));
  });
}

selectClosetItem(item: any) {
  this.selectedClosetItem = item;
  this.selectedCategory = item.category;

  console.log("selected item:", item);
}

  onProfileUpload(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.profileFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.profilePreview = reader.result as string;
      this.profileReady = true; // 👈 مهم
    };

    reader.readAsDataURL(file);
  }
}

get filteredClosetItems() {
  if (!this.selectedCategory) return this.closetItems;

  return this.closetItems.filter(
    item => item.category === this.selectedCategory
  );
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

  if (!this.profileFile) {
    alert("Upload your photo first");
    return;
  }

  const formData = new FormData();

  formData.append('person_image', this.profileFile);

  // ✅ Upload Mode
  if (this.activeTab === 'upload') {

    if (!this.itemFile || !this.selectedCategory) {
      alert("Upload item first");
      return;
    }

    const backendCategory = this.categoryMap[this.selectedCategory];

    formData.append('cloth_image', this.itemFile);
    formData.append('category', backendCategory);
  }

  // ✅ Closet Mode
  else if (this.activeTab === 'closet') {

    if (!this.selectedClosetItem) {
      alert("Select item from closet");
      return;
    }

    const backendCategory = this.categoryMap[this.selectedClosetItem.category];

    formData.append('cloth_image_url', this.selectedClosetItem.image);
    formData.append('category', backendCategory);
  }

  this.vtonService.createVton(formData).subscribe({
    next: () => {

      setTimeout(() => {

        this.vtonService.getVtonData().subscribe((blob: Blob) => {
          this.resultImage = URL.createObjectURL(blob);
          this.showResult = true;
        });

      }, 8000);

    }
  });
}
}