import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private readonly STORAGE_KEY = 'currentUser';
  private readonly USERS_KEY = 'users';

  constructor() {
    this.loadUser();
  }

  private loadUser() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.currentUserSubject.next(JSON.parse(stored));
    }
  }

  get currentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    const users = this.getUsers();
    const user = users.find(u => u.username === username);

    if (!user || user.password !== password) {
      return throwError(() => new Error('Invalid credentials'));
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userWithoutPassword));
    this.currentUserSubject.next(userWithoutPassword);

    return of(userWithoutPassword).pipe(delay(1000)); // Simulate network delay
  }

  register(userData: { username: string; password: string; fullName: string }): Observable<void> {
    const users = this.getUsers();
    
    if (users.some(u => u.username === userData.username)) {
      return throwError(() => new Error('Username already exists'));
    }

    const newUser = {
      id: users.length + 1,
      ...userData,
      role: 'DOCTOR'
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    return of(void 0).pipe(delay(1000)); // Simulate network delay
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  private getUsers(): any[] {
    const stored = localStorage.getItem(this.USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  }
}