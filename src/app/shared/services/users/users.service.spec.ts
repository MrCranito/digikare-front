import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { UsersService } from './users.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../../models/user/user.model';

describe('UsersService', () => {
  let spectator: SpectatorService<UsersService>;
  let service: UsersService;
  let httpClient: HttpClient;

  const createService = createServiceFactory({
    service: UsersService,
    imports:[HttpClientModule],
    providers: [HttpClient]
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    httpClient = spectator.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createUser API', () => {
    const user: User = {
      id: '1',
      email: 'johndoe@example.com',
      consents: [],
    };

    spyOn(httpClient, 'post').and.returnValue(
      new Observable<User>((subscriber) => {
        subscriber.next(user);
        subscriber.complete();
      })
    );

    const apiUrl = `${environment.API_URL}/users`;

    service.createUser(user).subscribe((result) => {
      expect(httpClient.post).toHaveBeenCalledWith(apiUrl, user);
      expect(result).toEqual(user);
    });
  });

  it('should call getCurrentUser API', () => {
    const email = 'johndoe@example.com';
    const apiUrl = `${environment.API_URL}/users/${email}`;
    const user: User = {
      id: '1',
      email: 'johndoe@example.com',
      consents: [],
    };

    spyOn(httpClient, 'get').and.returnValue(
      new Observable<User>((subscriber) => {
        subscriber.next(user);
        subscriber.complete();
      })
    );

    service.getCurrentUser(email).subscribe((result) => {
      expect(httpClient.get).toHaveBeenCalledWith(apiUrl);
      expect(result).toEqual(user);
    });
  });

  it('should call deleteUser API', () => {
    const userId = 1;
    const apiUrl = `${environment.API_URL}/users/${userId}`;
    const user: User = {
      id: '1',
      email: 'johndoe@example.com',
      consents: [],
    };

    spyOn(httpClient, 'delete').and.returnValue(
      new Observable<User>((subscriber) => {
        subscriber.next(user);
        subscriber.complete();
      })
    );

    service.deleteUser(userId).subscribe((result) => {
      expect(httpClient.delete).toHaveBeenCalledWith(apiUrl);
      expect(result).toEqual(user);
    });
  });
});