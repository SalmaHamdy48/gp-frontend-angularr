
import { Component , ViewChild ,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RecommendationComponent } from 'src/app/pages/recommendation/recommendation.component';
import { RecommendationService } from 'src/app/shared/services/recommendation/recommendation.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent {
  // User data
  @ViewChild('profileInput') profileInput!: ElementRef<HTMLInputElement>;
  profileImage: string | null = null; 
  userName = 'ABC DEF';
  userEmail = 'abc.def@example.com';
  tops: { id: number; name: string; imageUrl: string }[] = [];
bottoms: { id: number; name: string; imageUrl: string }[] = [];
shoes: { id: number; name: string; imageUrl: string }[] = [];
userId: string = '';
   constructor(private RecommendationService:RecommendationService , private AuthService :AuthService) {}

  activeTab: 'profile' | 'closet' | 'favorites' = 'profile';

  setActiveTab(tab: 'profile' | 'closet' | 'favorites') {
    this.activeTab = tab;
  }
ngOnInit() {
  this.userId = this.AuthService.currentUser?.id || '';
  this.getUserData(); 
}
  // Placeholder actions
  onSignOut() {
    console.log('Sign out clicked');
  }

  onProfile() {
    // Navigate to profile page (if not already there)
    // Example: this.router.navigate(['/profile']);
    console.log('Profile button clicked');
  }

  onUploadPhoto() {
    console.log('Upload photo clicked');
  }

getUserData() {
  this.AuthService.getCurrentUser().subscribe({
    next: (res) => {
      this.userName = res.username;
      this.userEmail = res.email;
    },
    error: (err) => console.error(err)
  });
}

  addItem(collection: 'tops' | 'bottoms' | 'shoes') {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.onchange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        
        const newItem = {
          category: collection,
          name: file.name.split('.').slice(0, -1).join('.'),
          image: ev.target.result, // base64 أو ممكن تستخدم FormData مع file
          type: '',  // ممكن تعمل اختيار Type لاحق
          color: '',
          gender: '',
          season: '',
          occasion: ''
        };

       const userId = this.userId; 

    this.RecommendationService.addClosetItem(userId, file).subscribe({
          next: (res : any) => {
            console.log('Item saved on backend:', res);
            this[collection].push(res);
          },
          error: (err : any) => console.error('Error saving item', err)
        });
      };
      reader.readAsDataURL(file);
    }
  };
  fileInput.click();
}
triggerProfileUpload() {
    this.profileInput.nativeElement.click(); 
  }

onProfileImageSelected(event: any) {
    // const file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e: any) => {
    //     this.profileImage = e.target.result; // يتم تحديث الصورة المعروضة
    //   };
    //   reader.readAsDataURL(file);
    //   // this.RecommendationService.uploadProfileImage(file).subscribe({
    //   next: (res: any) => {
    //     console.log('Profile image saved:', res);
    //   },
    //   error: (err: any) => console.error('Error uploading profile image', err)
    // });
    }
  
}
