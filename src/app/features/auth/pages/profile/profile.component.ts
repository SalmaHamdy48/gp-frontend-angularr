//import { Component, OnInit } from '@angular/core';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageUrl = '';
  profileImage = '';

  selectedFile!: File;
  currentUser: any;

  activeTab = 'profile';

  userName = '';
  userEmail = '';

  tops: any[] = [];
  bottoms: any[] = [];
  shoes: any[] = [];

  @ViewChild('closetInput')
  closetInput!: ElementRef<HTMLInputElement>;

  selectedClosetFile!: File;
  selectedClosetType = '';

  constructor(
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {

    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {

      this.currentUser = JSON.parse(storedUser);

      this.userName = this.currentUser.username || '';
      this.userEmail = this.currentUser.email || '';

      this.loadProfilePhoto();
      this.loadCloset();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  loadProfilePhoto() {

    if (!this.currentUser?.id) {
      return;
    }

    this.profileService
      .getProfilePhoto(this.currentUser.id)
      .subscribe({
        next: (res: any) => {
          this.imageUrl = res.image_url;
          this.profileImage = res.image_url;
        },
        error: () => {
          this.imageUrl = '';
          this.profileImage = '';
        }
      });
  }

  triggerProfileUpload() {
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    input?.click();
  }
  uploadClosetItem() {
  
  this.profileService
    .uploadClosetItem(
      this.currentUser.id,
      this.selectedClosetFile
    )
    .subscribe({
      next: (res: any) => {
        console.log('Upload Response:', res);

        const item = {
          imageUrl: res.url,
          name: res.subtype || res.category,
          public_id: res.public_id
        };

        const category =
          (res.category || '').toLowerCase();

        if (
          category.includes('top')
        ) {

          this.tops.push(item);

        } else if (
          category.includes('bottom')
        ) {

          this.bottoms.push(item);

        } else {

          this.shoes.push(item);
        }

        alert('Item added successfully');
      },
      error: (err) => {
        console.error(err);
        alert('Upload failed');
      }
    });
}
onClosetItemSelected(event: any) {

  if (!event.target.files.length) {
    return;
  }

  this.selectedClosetFile =
    event.target.files[0];

  this.uploadClosetItem();
}
  onProfileImageSelected(event: any) {

    if (event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];

      this.uploadPhoto();
    }
  }

  uploadPhoto() {

    if (!this.selectedFile) {
      alert('Please select an image');
      return;
    }

    this.profileService
      .uploadProfilePhoto(
        this.currentUser.id,
        this.selectedFile
      )
      .subscribe({
        next: (res: any) => {

          this.imageUrl = res.url;
          this.profileImage = res.url;

          alert('Photo uploaded successfully');
        },
        error: (err) => {
          console.error(err);
          alert('Upload failed');
        }
      });
  }

  deletePhoto() {

    this.profileService
      .deleteProfilePhoto(this.currentUser.id)
      .subscribe({
        next: () => {

          this.imageUrl = '';
          this.profileImage = '';

          alert('Photo deleted');
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  addItem(type: string) {

  this.selectedClosetType = type;

  this.closetInput.nativeElement.click();
}

  loadCloset() {

  this.profileService
    .getClosetItems(this.currentUser.id)
    .subscribe({
      next: (res: any) => {

        this.tops = [];
        this.bottoms = [];
        this.shoes = [];

        res.items.forEach((item: any) => {

          const category =
            (item.category || '').toLowerCase();

          const closetItem = {
            imageUrl: item.url,
            name: item.subtype || item.category,
            public_id: item.public_id
          };

          if (category.includes('top')) {

            this.tops.push(closetItem);

          } else if (
            category.includes('bottom')
          ) {

            this.bottoms.push(closetItem);

          } else {

            this.shoes.push(closetItem);
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
}
}