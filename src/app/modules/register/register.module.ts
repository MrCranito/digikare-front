import { NgModule } from "@angular/core";
import { RegisterRoutingModule } from "./register.routing.module";
import { RegisterComponent } from "./pages/register.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from "@angular/common";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        RegisterRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [NotificationsService],
})

export class RegisterModule {}