import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./pages/register.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class RegisterRoutingModule {}