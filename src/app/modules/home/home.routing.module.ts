import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home.component";
import { AuthGuard } from "src/app/shared/guards/isAuth.guard";

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuard],
    exports: [RouterModule],
})

export class HomeRoutingModule {}