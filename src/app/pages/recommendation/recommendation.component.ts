import { Component, OnInit } from '@angular/core';
import {
  RecommendationService,
  UploadItem,
  ClosetItem
} from 'src/app/shared/services/recommendation/recommendation.service';
import { environment } from 'src/app/enviroments/enviroment';

interface DisplayItem {
  id?: number;
  public_id?: string;
  image: string;
  name: string;
  type: string;
  color?: string;
  gender?: string;
  season?: string;
  usage?: string;
  category?: string;
}

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  userId = '';

  uploads: UploadItem[] = [];
  closetItems: ClosetItem[] = [];

  tops: DisplayItem[] = [];
  bottoms: DisplayItem[] = [];
  shoes: DisplayItem[] = [];

  closetTops: DisplayItem[] = [];
  closetBottoms: DisplayItem[] = [];
  closetShoes: DisplayItem[] = [];

  loadingRecommendations = false;
  showRecommendations = false;

  recommendedOutfit: DisplayItem[] = [];
  activeTab: 'upload' | 'closet' = 'upload';

  showAddItemModal = false;
  editingItemId: number | null = null;
  selectedImage = '';
  showToast = false;
  toastMessage = '';

  newItem = {
    name: '',
    type: '',
    color: '',
    gender: '',
    season: '',
    occasion: ''
  };

  selectedOccasion = 'any';

  constructor(
    private recommendationService: RecommendationService
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.userId = JSON.parse(storedUser).id || '';
    }

    if (!this.userId) {
      return;
    }

    this.loadUploads();
    this.loadCloset();
  }

  setTab(tab: 'upload' | 'closet'): void {
    this.activeTab = tab;
    this.showRecommendations = false;

    if (tab === 'upload') {
      this.loadUploads();
    }
  }

  loadUploads(): void {
    this.recommendationService.getUploads(this.userId).subscribe({
      next: (response) => {
        this.uploads = response.items.filter(item => item.source === 'upload');
        this.tops = this.uploads
          .filter(x => x.category === 'top')
          .map(item => this.toDisplayItem(item));
        this.bottoms = this.uploads
          .filter(x => x.category === 'bottom')
          .map(item => this.toDisplayItem(item));
        this.shoes = this.uploads
          .filter(x => x.category === 'foot')
          .map(item => this.toDisplayItem(item));
      },
      error: err => console.error(err)
    });
  }

  loadCloset(): void {
    this.recommendationService.getClosetItems(this.userId).subscribe({
      next: (response) => {
        this.closetItems = response.items;
        this.closetTops = this.closetItems
          .filter(x => (x.category || '').toLowerCase().includes('top'))
          .map(item => this.toClosetDisplayItem(item));
        this.closetBottoms = this.closetItems
          .filter(x => (x.category || '').toLowerCase().includes('bottom'))
          .map(item => this.toClosetDisplayItem(item));
        this.closetShoes = this.closetItems
          .filter(x => {
            const cat = (x.category || '').toLowerCase();
            return !cat.includes('top') && !cat.includes('bottom');
          })
          .map(item => this.toClosetDisplayItem(item));
      },
      error: err => console.error(err)
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0) {
      return;
    }

    Array.from(files).forEach((file) => {
      this.recommendationService
        .addUploadItem(this.userId, 'upload', file)
        .subscribe({
          next: () => this.loadUploads(),
          error: err => console.error(err)
        });
    });

    input.value = '';
  }

  getRecommendation(): void {
    this.loadingRecommendations = true;
    this.showRecommendations = false;

    const useCloset = this.activeTab === 'closet';

    this.recommendationService
      .getOutfitRecommendation(
        this.userId,
        this.selectedOccasion,
        useCloset
      )
      .subscribe({
        next: (response) => {
          this.loadingRecommendations = false;
          this.showRecommendations = true;
          this.recommendedOutfit = [];

          if (response.top) {
            this.recommendedOutfit.push(this.toDisplayItem(response.top));
          }
          if (response.bottom) {
            this.recommendedOutfit.push(this.toDisplayItem(response.bottom));
          }
          if (response.shoes) {
            this.recommendedOutfit.push(this.toDisplayItem(response.shoes));
          }
        },
        error: err => {
          this.loadingRecommendations = false;
          this.showToastMessage(
            err?.error?.detail || 'Could not generate outfit. Add tops, bottoms, and shoes first.'
          );
          console.error(err);
        }
      });
  }

  deleteItem(item: DisplayItem): void {
    if (!item.id) {
      return;
    }

    this.recommendationService
      .deleteUploadItem(this.userId, item.id)
      .subscribe({
        next: () => this.loadUploads(),
        error: err => console.error(err)
      });
  }

  editItem(item: DisplayItem): void {
    if (!item.id) {
      return;
    }

    this.editingItemId = item.id;
    this.selectedImage = item.image;
    this.newItem = {
      name: item.name || '',
      type: item.type || '',
      color: item.color || '',
      gender: item.gender || '',
      season: item.season || '',
      occasion: this.mapUsageToOccasion(item.usage)
    };
    this.showAddItemModal = true;
  }

  saveItem(): void {
    if (!this.editingItemId) {
      return;
    }

    const payload: {
      type?: string;
      color?: string;
      gender?: string;
      season?: string;
      usage?: string;
    } = {};

    if (this.newItem.type || this.newItem.name) {
      payload.type = this.newItem.type || this.newItem.name;
    }
    if (this.newItem.color && this.newItem.color !== 'Select color') {
      payload.color = this.newItem.color;
    }
    if (this.newItem.gender && this.newItem.gender !== 'Select gender') {
      payload.gender = this.newItem.gender;
    }
    if (this.newItem.season && this.newItem.season !== 'Select season') {
      payload.season = this.newItem.season;
    }

    const usage = this.mapOccasionToUsage(this.newItem.occasion);
    if (usage) {
      payload.usage = usage;
    }

    this.recommendationService
      .updateUploadItem(this.userId, this.editingItemId, payload)
      .subscribe({
        next: () => {
          this.showToastMessage('Item updated successfully');
          this.closeAddItem();
          this.loadUploads();
        },
        error: (err) => {
          console.error(err);
          this.showToastMessage('Failed to update item');
        }
      });
  }

  closeAddItem(): void {
    this.showAddItemModal = false;
    this.editingItemId = null;
    this.selectedImage = '';
    this.newItem = {
      name: '',
      type: '',
      color: '',
      gender: '',
      season: '',
      occasion: ''
    };
  }

  addItem(): void {
    this.saveItem();
  }

  get isEditingItem(): boolean {
    return this.editingItemId !== null;
  }

  private mapOccasionToUsage(occasion: string): string | undefined {
    const map: Record<string, string> = {
      Casual: 'Casual',
      Business: 'Smart Casual',
      Formal: 'Formal',
      Party: 'Party',
      Athletic: 'Sports',
      Beach: 'Casual',
      'Any Occasion': ''
    };

    const usage = map[occasion];
    return usage || undefined;
  }

  private mapUsageToOccasion(usage?: string): string {
    if (!usage) {
      return '';
    }

    const map: Record<string, string> = {
      Casual: 'Casual',
      'Smart Casual': 'Business',
      Formal: 'Formal',
      Party: 'Party',
      Sports: 'Athletic',
      Ethnic: 'Formal'
    };

    return map[usage] || usage;
  }

  get closetItemCount(): number {
    return this.closetTops.length + this.closetBottoms.length + this.closetShoes.length;
  }

  private toDisplayItem(item: any): DisplayItem {
    return {
      id: item.id,
      public_id: item.cloudinary_public_id || item.public_id,
      image: this.resolveImageUrl(item),
      name: item.subtype || item.category || 'Item',
      type: item.subtype || item.category || '',
      color: item.color,
      gender: item.gender,
      season: item.season,
      usage: item.usage,
      category: item.category
    };
  }

  private toClosetDisplayItem(item: ClosetItem): DisplayItem {
    return {
      public_id: item.public_id,
      image: item.url,
      name: item.subtype || item.category || 'Item',
      type: item.subtype || item.category || '',
      color: item.color,
      gender: item.gender,
      season: item.season,
      category: item.category
    };
  }

  private resolveImageUrl(item: any): string {
    const url = item.image_url || item.url || item.image || '';
    if (!url) {
      return '';
    }
    if (url.startsWith('http')) {
      return url;
    }
    const base = environment.apiUrl.replace(/\/$/, '');
    return url.startsWith('/') ? `${base}${url}` : `${base}/${url}`;
  }

  private showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
