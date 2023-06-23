import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { NotificationsService } from './notifications.service';
import { ToastrService, ActiveToast, GlobalConfig } from 'ngx-toastr';
import { ToastSuccessComponent } from '../../components/toasts/success/toastSuccess.component';
import { ToastErrorComponent } from '../../components/toasts/error/toastError.component';

describe('NotificationsService', () => {
  let spectator: SpectatorService<NotificationsService>;
  let service: NotificationsService;
  let toastrService: ToastrService;

  const createService = createServiceFactory({
    service: NotificationsService,
    providers: [{
        provide: ToastrService,
        useValue: {
            show: () => {},
        }
    }],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    toastrService = spectator.inject(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call showToast method with success toast', () => {
    const message = 'Success message';
    const options: GlobalConfig = {
        ...toastrService.toastrConfig,
      toastClass: 'custom-toast',
      tapToDismiss: true,
    };

    spyOn(toastrService, 'show');

    service.showToast(message, options);

    expect(toastrService.show).toHaveBeenCalledWith(message, '', options);
  });

  it('should call showSuccess method', () => {
    const message = 'Success message';
    const options: GlobalConfig = {
      ...toastrService.toastrConfig,
      toastClass: 'custom-toast',
      tapToDismiss: true,
      toastComponent: ToastSuccessComponent,
    };
    const expectedToast: ActiveToast<any> = toastrService.show(message, '', options)

    spyOn(service, 'showToast').and.returnValue(expectedToast);

    const result = service.showSuccess(message);

    expect(service.showToast).toHaveBeenCalledWith(message, options);
    expect(result).toEqual(expectedToast);
  });

  it('should call showError method', () => {
    const message = 'Error message';
    const options: GlobalConfig = {
        ...toastrService.toastrConfig,
      toastClass: 'custom-toast',
      tapToDismiss: true,
      toastComponent: ToastErrorComponent,
    };
    const expectedToast: ActiveToast<any> = toastrService.show(message, '', options)

    spyOn(service, 'showToast').and.returnValue(expectedToast);

    const result = service.showError(message);

    expect(service.showToast).toHaveBeenCalledWith(message, options);
    expect(result).toEqual(expectedToast);
  });
});