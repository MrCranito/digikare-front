import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "../../models/user/user.model";
import { Observable } from "rxjs";
import { environment } from "@env/environment";

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(private http: HttpClient) {}

    createUser(user: User): Observable<User> {
        return this.http.post<User>(
            `${environment.API_URL}/users`, user);
    }

    getCurrentUser(email: string | null): Observable<User> {
        return this.http.get<User>(
            `${environment.API_URL}/users/${email}`);
    }

    deleteUser(id: number): Observable<User> {
        return this.http.delete<User>(
            `${environment.API_URL}/users/${id}`);
    }
}