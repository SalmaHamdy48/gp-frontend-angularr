// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-recommendation',
//   templateUrl: './recommendation.component.html',
//   styleUrls: ['./recommendation.component.scss']
// })
// export class RecommendationComponent {

// }




import { Component, OnInit } from '@angular/core';

interface Occasion {
  id: string;
  label: string;
}

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {
deleteItem(_t45: any,arg1: string) {
throw new Error('Method not implemented.');
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
    { id: 'wedding', label: 'wedding' }
  ];


  closet = {
  tops: [],
  bottoms: [],
  shoes: []
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
    occasion: ''
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
  constructor() {}

  ngOnInit(){
    this.fetchCloset();
  }


openAddItem(category: string){
    this.selectedCategory = category;
    this.showAddItemModal = true;
  }

 

  // addItem(){
  //   console.log('Item added:', this.newItem);

  //   this.showAddItemModal = false;
  // }

//   addItem(){

//   const item = {
//     name: this.newItem.name,
//     type: this.newItem.type,
//     color: this.newItem.color,
//     gender: this.newItem.gender,
//     season: this.newItem.season,
//     image: this.previewImage
//   };

//   if(this.selectedCategory === 'top'){
//     this.tops.push(item);
//   }

//   if(this.selectedCategory === 'bottom'){
//     this.bottoms.push(item);
//   }

//   if(this.selectedCategory === 'shoe'){
//     this.shoes.push(item);
//   }

//   this.showAddItemModal = false;

// }




// addItem() {

//   const item = {
//     name: this.newItem.name,
//     type: this.newItem.type,
//     color: this.newItem.color,
//     gender: this.newItem.gender,
//     season: this.newItem.season,
//     // image: this.previewImage
//     image: this.selectedImage
//   };

//   if (this.selectedCategory === 'top') {
//     this.tops.push(item);
//   }

//   if (this.selectedCategory === 'bottom') {
//     this.bottoms.push(item);
//   }

//   if (this.selectedCategory === 'shoe') {
//     this.shoes.push(item);
//   }

//   // this.showAddItemModal = false;
//   this.closeAddItem();
// }



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
...this.newItem
};

if (this.currentCategory === 'top') this.tops.push(item);
if (this.currentCategory === 'bottom') this.bottoms.push(item);
if (this.currentCategory === 'shoe') this.shoes.push(item);

}

this.closeAddItem();

}
fetchCloset(){
  // call backend service
}

  switchTab(tab: string): void {
    this.selectedTab = tab;
  }


  setTab(tab: string){
    this.activeTab = tab;
  }
  selectOccasion(occasion: string): void {
    this.selectedOccasion = occasion;
  }

//   onImageSelected(event: any, category: string) {

//   const file = event.target.files[0];

//   if (!file) return;

//   this.selectedFile = file;
//   this.selectedCategory = category;

//   const reader = new FileReader();

//   reader.onload = () => {
//     this.previewImage = reader.result;
//     this.showAddItemModal = true; // OPEN MODAL AFTER IMAGE
//   };

//   reader.readAsDataURL(file);
// }

// onImageSelected(event: any, category: string) {

//   const file = event.target.files[0];
//   if (!file) return;

//   this.selectedCategory = category;

//   // ✅ Auto-fill item name with file name (without extension)
//   const fileName = file.name.split('.').slice(0, -1).join('.');
//   this.newItem.name = fileName;

//   const reader = new FileReader();

//   reader.onload = () => {
//     this.previewImage = reader.result;
//     this.showAddItemModal = true;
//   };

//   reader.readAsDataURL(file);
// }


// onImageSelected(event: any, category: string) {

//   const file = event.target.files[0];
//   if (!file) return;

//   this.selectedCategory = category;

//   const reader = new FileReader();

//   reader.onload = () => {

//     const result = reader.result;

//     if (typeof result === 'string') {
//       this.previewImage = result;
//     }

//     this.newItem.name = file.name.split('.')[0];

//     this.showAddItemModal = true;
//   };

//   reader.readAsDataURL(file);
// }

// onImageSelected(event: any, type: string) {

//   const file = event.target.files[0];

//   if (file) {

//     // ✅ Automatically set item name from device file name
//     this.newItem.name = file.name;
//     // without Extension
//     this.newItem.name = file.name.split('.').slice(0, -1).join('.');

//     const reader = new FileReader();

//     reader.onload = () => {
//       this.selectedImage = reader.result as string;
//       this.showAddItemModal = true;
//     };

//     reader.readAsDataURL(file);
//   }
// }

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
season: ''
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
    if (this.selectedOccasion) {
      this.showRecommendations = true;
      // Would call service to get AI recommendations
      console.log('Getting recommendations for:', this.selectedOccasion);
    }
  }

  

  goToProfile(): void {
    // Navigate to profile to add items
    console.log('Navigate to profile');
  }



  editItem(item: any, category: string) {

this.editingItem = item;
this.editingCategory = category;

this.newItem = { ...item };   // copy values into form
this.selectedImage = item.image;

this.showAddItemModal = true;

}



closeAddItem(){

this.showAddItemModal = false;
this.editingItem = null;

this.newItem = {
name:'',
type:'',
color:'',
gender:'',
season:'',
occasion:''
};

}
}


