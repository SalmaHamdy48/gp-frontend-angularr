// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-recommendation',
//   templateUrl: './recommendation.component.html',
//   styleUrls: ['./recommendation.component.scss']
// })
// export class RecommendationComponent {

// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
// import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { RecommendationService } from 'src/app/shared/services/recommendation/recommendation.service';



interface Occasion {
  id: string;
  label: string;
}

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
})
export class RecommendationComponent implements OnInit {
 deleteItem(item: any, category: string) {
  if (category === 'top') {
    this.tops = this.tops.filter(i => i !== item);
  } else if (category === 'bottom') {
    this.bottoms = this.bottoms.filter(i => i !== item);
  } else if (category === 'shoe') {
    this.shoes = this.shoes.filter(i => i !== item);
  }
}

  isClosetEmpty: boolean = true;
  selectedTab: string = 'use-closet';
  selectedOccasion: string = '';
  showRecommendations: boolean = false;
  
  occasions: Occasion[] = [
    { id: 'casual', label: 'Casual' },
    { id: 'business', label: 'business/professional' },
    { id: 'formal', label: 'Formal Event' },
    { id: 'party', label: 'party/night out' },
    { id: 'date', label: 'date night' },
    { id: 'workout', label: 'Workout/Athletic' },
    { id: 'beach', label: 'Beach/vacation' },
    { id: 'wedding', label: 'wedding' },
  ];

  closet = {
    tops: [],
    bottoms: [],
    shoes: [],
  };

  currentCategory: string = '';
  tops: any[] = [];
  bottoms: any[] = [];
  shoes: any[] = [];
  currentType: string = '';
  activeTab: string = 'closet';
  // Modal
  showAddItemModal: boolean = false;

  newItem = {
    name: '',
    type: '',
    color: '',
    gender: '',
    season: '',
    occasion: '',
  };

  closetItems: any[] = [
    // Mock data - would be populated from profile
  ];

  selectedFile!: File;
  selectedCategory: string = '';
  previewImage: string = '';
  selectedImage: string | null = null;
  editingItem: any = null;
  editingCategory: string = '';
userId: string='';
  // this.selectedCategory = type;
  constructor(private recommendationService: RecommendationService , private AuthService:AuthService) {}

  ngOnInit() {
    this.userId = this.AuthService.currentUser?.id || '';
    this.fetchCloset();
  }

  openAddItem(category: string) {
    this.selectedCategory = category;
    this.currentCategory = category;
    this.showAddItemModal = true;
  }

  addItem() {
    if (this.editingItem) {
      this.editingItem.name = this.newItem.name;
      this.editingItem.type = this.newItem.type;
      this.editingItem.color = this.newItem.color;
      this.editingItem.gender = this.newItem.gender;
      this.editingItem.season = this.newItem.season;
      this.editingItem.occasion = this.newItem.occasion;
    } else {
      const item = {
        image: this.selectedImage,
        ...this.newItem,
      };

      if (this.currentCategory === 'top') this.tops.push(item);
      if (this.currentCategory === 'bottom') this.bottoms.push(item);
      if (this.currentCategory === 'shoe') this.shoes.push(item);
    }

    this.closeAddItem();
  }
  fetchCloset() {
  this.recommendationService.getClosetItems(this.userId).subscribe(res => {
    const items = res.items || [];

    this.tops = items.filter(i => i.category === 'top');
    this.bottoms = items.filter(i => i.category === 'bottom');
    this.shoes = items.filter(i => i.category === 'foot');

    this.isClosetEmpty = items.length === 0;
  });
}
  switchTab(tab: string): void {
    this.selectedTab = tab;
  }

  setTab(tab: 'closet' | 'upload') {
  this.activeTab = tab;

  if (tab === 'closet') {
   this.fetchCloset();
  }
}
  selectOccasion(occasion: string): void {
    this.selectedOccasion = occasion;
  }

onImageSelected(event: any, type: 'top' | 'bottom' | 'shoe') {
  const file: File = event.target.files[0];
  if (!file) return;

  // 1️⃣ ارفعي في closet (اختياري)
  this.recommendationService.addClosetItem(this.userId, file).subscribe({
    next: (res) => {
      console.log('Uploaded to closet:', res);

      const item = {
        name: file.name,
        image: res.url,
        type: res.subtype || '',
        color: res.color || '',
        gender: res.gender || '',
        season: res.season || '',
        usage: res.usage || '',
      };

      // UI فقط
      if (type === 'top') this.tops.push(item);
      else if (type === 'bottom') this.bottoms.push(item);
      else this.shoes.push(item);

      this.selectedImage = res.url;

      // 2️⃣ 👇 أهم خطوة (تضيف للـ recommendation)
      this.recommendationService
        .addUploadItem(this.userId, 'upload', file)
        .subscribe({
          next: (uploadRes) => {
            console.log('Added to uploads (rec):', uploadRes);
          },
          error: (err) => {
            console.error('Upload to rec failed', err);
          },
        });
    },

    error: (err) => {
      console.error('Upload error', err);
      alert('Failed to upload image!');
    },
  });
}
recommendedOutfit: any[] = [];
getRecommendations(): void {
  
    

  this.recommendationService.getOutfitRecommendation(this.userId).subscribe({
    next: (res) => {
      console.log('Recommended outfit response:', res);

      // هنا بنضيف الـ backend base URL للصور
      const baseUrl = 'http://127.0.0.1:8000'; // ممكن كمان تاخديه من environment.apiUrl
      this.recommendedOutfit = [
        res.top ? { ...res.top, image: baseUrl + res.top.image_url } : null,
        res.bottom ? { ...res.bottom, image: baseUrl + res.bottom.image_url } : null,
        res.shoes ? { ...res.shoes, image: baseUrl + res.shoes.image_url } : null,
      ].filter(Boolean);

      this.showRecommendations = true;
    },
    error: (err) => {
      console.error('Error fetching recommendations', err);
      alert('Failed to get outfit recommendations. Please try again.');
    }
  });
}

  goToProfile(): void {
    // Navigate to profile to add items
    console.log('Navigate to profile');
  }
  editItem(item: any, category: string) {
    this.editingItem = item;
    this.editingCategory = category;
    this.newItem = { ...item }; // copy values into form
    this.selectedImage = item.image;
    this.showAddItemModal = true;
  }

  closeAddItem() {
    this.showAddItemModal = false;
    this.editingItem = null;

    this.newItem = {
      name: '',
      type: '',
      color: '',
      gender: '',
      season: '',
      occasion: '',
    };
  }
  
}