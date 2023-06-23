import { ActiveToast, GlobalConfig, ToastrService } from "ngx-toastr";
import { cloneDeep } from "lodash";
import { ToastSuccessComponent } from "../../components/toasts/success/toastSuccess.component";
import { ToastErrorComponent } from "../../components/toasts/error/toastError.component";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    toastOptions: GlobalConfig = {
        ...this.toastrService.toastrConfig,
    };

    constructor(private toastrService: ToastrService) {
        this.toastOptions = {
            ...this.toastOptions,
            toastClass: 'custom-toast',
            tapToDismiss: true,
        }
    }

    showToast(
        message: string,
        options: GlobalConfig
        ): ActiveToast<any> {
        return this.toastrService.show(
            message,
            '',
            options
        )
    }

    showSuccess(message: string): ActiveToast<any> {
        const options = cloneDeep(this.toastOptions);
        options.toastComponent = ToastSuccessComponent;
        return this.showToast(message, options)
    }

    showError(message: string) {
        const options = cloneDeep(this.toastOptions);
        options.toastComponent = ToastErrorComponent;
        return this.showToast(message, options)
    }
}