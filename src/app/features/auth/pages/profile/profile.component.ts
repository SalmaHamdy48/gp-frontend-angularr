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
    standalone: true,
imports: [CommonModule, FormsModule],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  // User data
  userName = 'ABC DEF';
  userEmail = 'abc.def@example.com';

  // Active tab
  activeTab: 'profile' | 'closet' = 'profile';

  setActiveTab(tab: 'profile' | 'closet') {
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
}










