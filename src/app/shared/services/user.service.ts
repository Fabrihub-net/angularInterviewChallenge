import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }

    getProfile() {
        const currentUserId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : '';
        return this.http.get(`${environment.apiUrl}/users/profile/${currentUserId}`);
    }

    updateProfile(profileData: string) {
        const currentUserId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : '';
        return this.http.post(`${environment.apiUrl}/users/profile/${currentUserId}`, profileData);
    }

    changePassword(oldPass: string, newPass: string) {
        const currentUserId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : '';
        return this.http.post(`${environment.apiUrl}/users/change-password/${currentUserId}`, { oldPass, newPass });
    }
}
