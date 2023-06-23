import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home.routing.module";
import { HomeComponent } from "./pages/home.component";
import { StoreModule } from "@ngrx/store";
import { usersFeatureKey, usersReducer } from "src/app/shared/store/reducers/users.reducer";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule, HomeRoutingModule, StoreModule.forFeature(usersFeatureKey, usersReducer)],
    providers: [NotificationsService],
})

export class HomeModule {}