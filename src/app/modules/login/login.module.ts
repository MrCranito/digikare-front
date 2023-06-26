import { NgModule } from "@angular/core";
import { LoginComponent } from "./pages/login.component";
import { LoginRoutingModule } from "./login.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { provideMockStore } from "@ngrx/store/testing";

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [NotificationsService],
})

export class LoginModule {}