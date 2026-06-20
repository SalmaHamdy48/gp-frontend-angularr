import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecommendationComponent } from 'src/app/pages/recommendation/recommendation.component';
import { RecommendationService } from 'src/app/shared/services/recommendation/recommendation.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  // User data
  @ViewChild('profileInput') profileInput!: ElementRef<HTMLInputElement>;
  profileImage: string | null = null;
  userName = 'Amira2026';
  userEmail = 'amira@gmail.com';
  tops: { id: number; name: string; imageUrl: string }[] = [];
  bottoms: { id: number; name: string; imageUrl: string }[] = [];
  shoes: { id: number; name: string; imageUrl: string }[] = [];
  userId: string = '';
  constructor(
    private RecommendationService: RecommendationService,
    private AuthService: AuthService,
    private ProfileService: ProfileService,
  ) {}

  activeTab: 'profile' | 'closet' | 'favorites' = 'profile';

  // setActiveTab(tab: 'profile' | 'closet' | 'favorites')
  setActiveTab(tab: 'profile' | 'closet') {
    this.activeTab = tab;
  }
  ngOnInit() {
    this.userId = this.AuthService.currentUser?.id || '';
    this.getUserData();
    this.loadCloset();
    this.loadProfileImage(); // 👈 مهم
  }

  loadProfileImage() {
    this.ProfileService.getProfilePhoto(this.userId).subscribe({
      next: (res: any) => {
        this.profileImage = res.image_url;
      },
      error: () => {
        this.profileImage = null;
      },
    });
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
      error: (err) => console.error(err),
    });
  }

  addItem(collection: 'tops' | 'bottoms' | 'shoes') {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      this.RecommendationService.addClosetItem(this.userId, file).subscribe({
        next: () => {
          // 🔥 أهم خطوة: نعيد تحميل الكل من backend
          this.loadCloset();
        },
        error: (err: any) => {
          console.error('Error saving item', err);
        },
      });
    };

    fileInput.click();
  }

  // addItem(collection: 'tops' | 'bottoms' | 'shoes') {

  // const fileInput = document.createElement('input');

  // fileInput.type = 'file';
  // fileInput.accept = 'image/*';

  // fileInput.onchange = (event: any) => {

  //   const file = event.target.files[0];

  //   if (!file) return;

  //   // ✅ CREATE LOCAL PREVIEW
  //   const reader = new FileReader();

  //   reader.onload = (e: any) => {

  //     const newItem = {
  //       id: Date.now(),
  //       name: file.name,
  //       imageUrl: e.target.result
  //     };

  //     // ✅ ADD DIRECTLY TO UI
  //     if (collection === 'tops') {
  //       this.tops.push(newItem);
  //     }

  //     else if (collection === 'bottoms') {
  //       this.bottoms.push(newItem);
  //     }

  //     else if (collection === 'shoes') {
  //       this.shoes.push(newItem);
  //     }
  //   };

  //   reader.readAsDataURL(file);

  //   // ✅ SEND TO BACKEND
  //   this.RecommendationService
  //     .addClosetItem(this.userId, file)
  //     .subscribe({
  //       next: (res) => {
  //         console.log('Uploaded successfully');
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       }
  //     });

  // };

  // fileInput.click();
  // }
  loadCloset() {
    this.RecommendationService.getClosetItems(this.userId).subscribe({
      next: (res: any) => {
        const items = res.items || [];

        this.tops = items.map((i: any) => ({
          id: i.public_id,
          name: '',
          imageUrl: i.url,
        }));
      },
      error: (err) => console.error(err),
    });
  }

  triggerProfileUpload() {
    this.profileInput.nativeElement.click();
  }
  onProfileImageSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    // ✅ عرض الصورة فورًا (Preview)
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileImage = e.target.result;
    };
    reader.readAsDataURL(file);

    // ✅ رفع الصورة للـ backend
    this.ProfileService.uploadProfilePhoto(this.userId, file).subscribe({
      next: (res: any) => {
        console.log('Profile image saved:', res);

        // 🔥 مهم: نجيب الصورة من السيرفر تاني عشان نضمن إنها نفس URL
        this.loadProfileImage();
      },
      error: (err: any) => {
        console.error('Error uploading profile image', err);
      },
    });
  }
}
