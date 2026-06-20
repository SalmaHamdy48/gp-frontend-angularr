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
  } else if (category === 'bag') {
    this.bags = this.bags.filter(i => i !== item);
  }
}

  isClosetEmpty: boolean = true;
  selectedTab: string = 'use-closet';
  selectedOccasion: string = '';
  showRecommendations: boolean = false;
  loadingRecommendations = false;
  
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
    bags: [],
  };

  currentCategory: string = '';
  tops: any[] = [];
  bottoms: any[] = [];
  bags: any[] = [];
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

  toastMessage: string = '';
showToast: boolean = false;

showError(message: string) {
  this.toastMessage = message;
  this.showToast = true;

  setTimeout(() => {
    this.showToast = false;
  }, 3000);
}
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
      if (this.currentCategory === 'shoe') this.bags.push(item);
    }

    this.closeAddItem();
  }
  fetchCloset() {
  this.recommendationService.getClosetItems(this.userId).subscribe(res => {
    const items = res.items || [];

    this.tops = items.filter(i => i.category === 'top');
    this.bottoms = items.filter(i => i.category === 'bottom');
    this.bags = items.filter(i => i.category === 'foot');

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
      else this.bags.push(item);

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
      this.showError('Failed to upload image!');
    },
  });
}
recommendedOutfit: any[] = [];
getRecommendations(): void {
  if (this.loadingRecommendations) return;
  this.recommendedOutfit = [];
  this.showRecommendations = false;
  this.loadingRecommendations = true;
  this.recommendationService.getOutfitRecommendation(this.userId).subscribe({
    next: (res) => {
      console.log('Recommended outfit response:', res);

      // هنا بنضيف الـ backend base URL للصور
      const baseUrl = 'http://127.0.0.1:8000'; // ممكن كمان تاخديه من environment.apiUrl
      this.recommendedOutfit = [
        res.top ? { ...res.top, image: baseUrl + res.top.image_url } : null,
        res.bottom ? { ...res.bottom, image: baseUrl + res.bottom.image_url } : null,
        res.bag ? { ...res.bag, image: baseUrl + res.bag.image_url } : null,
      ].filter(Boolean);

      this.showRecommendations = true;
      this.loadingRecommendations = false;
    },
    error: (err) => {
      console.error('Error fetching recommendations', err);
      this.loadingRecommendations = false;
      this.showError('Failed to get outfit recommendations!');
    },
    complete: () => {
  this.loadingRecommendations = false;
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

  this.newItem = {
    name: item.name || '',

    // ✅ أهم سطر
    type: item.type || item.subtype || '',

    color: item.color || this.mapColor(item.color_group),

    gender: item.gender || '',

    season: item.season || '',

    // ✅ usage → occasion
    occasion: item.occasion || item.usage || '',
  };

  this.selectedImage = item.image || item.image_url;

  this.showAddItemModal = true;
}
mapColor(colorGroup: number): string {
  const colors: any = {
    1: 'Black',
    2: 'White',
    3: 'Red',
    4: 'Blue',
    5: 'Green',
    6: 'Yellow',
    7: 'Pink',
    8: 'Purple',
    9: 'Brown',
    10: 'Gray',
    11: 'Orange',
    12: 'Beige', // 👈 غالبًا ده
  };

  return colors[colorGroup] || '';
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