import { Component, Input } from "@angular/core";
import { Toast, ToastPackage, ToastrService } from "ngx-toastr";
import { ToastPreset, toastPresets } from "src/app/shared/models/toast/toast.model";

@Component({
    selector: 'app-toast-error',
    templateUrl: './toastError.component.html',
})

export class ToastErrorComponent extends Toast {

    @Input() toastId: number = 0;
    errorPresets: ToastPreset

    constructor(
        protected override toastrService: ToastrService,
        public override toastPackage: ToastPackage
        ) {
        super(toastrService, toastPackage);
        this.errorPresets = toastPresets.error;
    }

    onClose(event: any): void {
        event?.stopPropagation();
        this.toastrService.remove(this.toastId)
    }
}