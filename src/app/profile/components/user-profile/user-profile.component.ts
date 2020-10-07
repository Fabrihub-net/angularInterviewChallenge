import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  editorText = '';
  hasProfile = false;
  isLoading = true;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadProfileData();
  }

  private loadProfileData() {
    this.isLoading = true;
    this.userService.getProfile().subscribe(
      (data: any) => {
        if (data.exist) {
          this.hasProfile = true;
          this.editorText = data.profileData;
        } else {
          this.hasProfile = false;
        }
        this.isLoading = false;
      }
    );
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.editorText = event.editor.root.innerHTML;
  }

  onCreateProfile() {
    if (this.editorText) {
      this.userService.updateProfile(this.editorText).subscribe(
        data => {
          this.router.navigate(['/']);
        }
      );
    }
  }

}
