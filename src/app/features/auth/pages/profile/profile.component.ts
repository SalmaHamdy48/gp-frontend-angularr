// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent {

// }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent {
//   // Dummy user data
//   userName = 'Alex Johnson';
//   userEmail = 'alex.johnson@example.com';

//   // Handle sign out (placeholder)
//   onSignOut(): void {
//     console.log('Sign out clicked');
//     // Add actual sign out logic here
//   }

//   // Handle photo upload (placeholder)
//   onUploadPhoto(): void {
//     console.log('Upload photo clicked');
//     // Open file picker or trigger upload
//   }
// }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent {
//   // Dummy user data
//   userName = 'ABC DEF';
//   userEmail = 'abc.def@example.com';

//   // Active tab
//   activeTab: 'profile' | 'closet' = 'profile';

//   setActiveTab(tab: 'profile' | 'closet'): void {
//     this.activeTab = tab;
//   }

//   // Placeholder actions
//   onSignOut(): void {
//     console.log('Sign out clicked');
//   }

//   onUploadPhoto(): void {
//     console.log('Upload photo clicked');
//   }
// }

// work
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  // User data
  userName = 'ABC DEF';
  userEmail = 'abc.def@example.com';
  tops: { id: number; name: string; imageUrl: string }[] = [];
bottoms: { id: number; name: string; imageUrl: string }[] = [];
shoes: { id: number; name: string; imageUrl: string }[] = [];

  // Active tab
  // activeTab: 'profile' | 'closet' = 'profile';

  // setActiveTab(tab: 'profile' | 'closet') {
  //   this.activeTab = tab;
  // }

  activeTab: 'profile' | 'closet' | 'favorites' = 'profile';

  setActiveTab(tab: 'profile' | 'closet' | 'favorites') {
    this.activeTab = tab;
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

  addItem(collection: 'tops' | 'bottoms' | 'shoes') {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev: any) => {
          const newItem = { id: Date.now(), name: file.name, imageUrl: ev.target.result };
          this[collection].push(newItem);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }
}
