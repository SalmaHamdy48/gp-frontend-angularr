// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-recommendation',
//   templateUrl: './recommendation.component.html',
//   styleUrls: ['./recommendation.component.scss']
// })
// export class RecommendationComponent {

// }

import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
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

  // this.selectedCategory = type;
  constructor(private recommendationService: RecommendationService , private profileService: ProfileService) {}

  ngOnInit() {
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
    this.profileService.getClosetItems().subscribe(items => {
    this.tops = items.tops || [];
    this.bottoms = items.bottoms || [];
    this.shoes = items.shoes || [];
    this.isClosetEmpty = this.tops.length + this.bottoms.length + this.shoes.length === 0;
  });
  }

  switchTab(tab: string): void {
    this.selectedTab = tab;
  }

  setTab(tab: 'closet' | 'upload') {
  this.activeTab = tab;

  if (tab === 'closet') {
    this.profileService.getClosetItems().subscribe(items => {
      this.tops = items.tops;
      this.bottoms = items.bottoms;
      this.shoes = items.shoes;
    });
  }
}
  selectOccasion(occasion: string): void {
    this.selectedOccasion = occasion;
  }

  onImageSelected(event: any, category: string) {
    const files: FileList = event.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        const item = {
          name: file.name.split('.').slice(0, -1).join('.'),
          image: reader.result as string,
          type: '',
          color: '',
          gender: '',
          season: '',
        };

        if (category === 'top') {
          this.tops.push(item);
        }

        if (category === 'bottom') {
          this.bottoms.push(item);
        }

        if (category === 'shoe') {
          this.shoes.push(item);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  getRecommendations(): void {
  if (!this.selectedOccasion) {
    alert('Please select an occasion!');
    return;
  }

  if (this.tops.length + this.bottoms.length + this.shoes.length === 0) {
    alert('Your closet is empty! Please add items first.');
    return;
  }

  const data = {
    occasion: this.selectedOccasion,
    tops: this.tops,
    bottoms: this.bottoms,
    shoes: this.shoes,
  };

  this.recommendationService.createRecommendation(data).subscribe({
    next: (res) => {
      console.log('Recommendations:', res);
      this.showRecommendations = true;
    },
    error: (err) => {
      console.error('Error getting recommendations', err);
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
