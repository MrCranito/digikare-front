import { Component, Input } from "@angular/core";
import { Toast, ToastPackage, ToastrService } from "ngx-toastr";
import { ToastPreset, toastPresets } from "src/app/shared/models/toast/toast.model";

@Component({
    selector: 'app-toast-success',
    templateUrl: './toastSuccess.component.html',
})

export class ToastSuccessComponent extends Toast { 
    @Input() toastId: number = 0;
    successPresets: ToastPreset

    constructor(
        protected override toastrService: ToastrService,
        public override toastPackage: ToastPackage
        ) {
        super(toastrService, toastPackage);
        this.successPresets = toastPresets.success;
    }

    onClose(event: any): void {
        event?.stopPropagation();
        this.toastrService.remove(this.toastId)
    }
}