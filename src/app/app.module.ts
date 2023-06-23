import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HomeModule } from './modules/home/home.module';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { usersFeatureKey, usersReducer } from './shared/store/reducers/users.reducer';
import { eventsFeatureKey, eventsReducer } from './shared/store/reducers/events.reducer';
import { UsersEffect } from './shared/store/effects/users/users.effect';
import { EventsEffect } from './shared/store/effects/events/events.effect';
import { RoutersEffect } from './shared/store/effects/routers/routers.effect';
import { ToastrModule } from 'ngx-toastr';
import { NotificationsService } from './shared/services/notifications/notifications.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MODULES = [ HomeModule ]

const NGRX_TOOLING = [
  StoreDevtoolsModule.instrument()
]

const NGRX_STORE_FEATURES  = [
  StoreModule.forFeature(usersFeatureKey, usersReducer),
  StoreModule.forFeature(eventsFeatureKey, eventsReducer)
]

const NGRX_EFFECTS_FEATURES = [
  EffectsModule.forFeature([UsersEffect, EventsEffect, RoutersEffect])
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MODULES,
    HttpClientModule,
    AppRoutingModule,
    EffectsModule.forRoot([UsersEffect, RoutersEffect]),
    StoreModule.forRoot(reducers),
    NGRX_TOOLING,
    NGRX_STORE_FEATURES,
    NGRX_EFFECTS_FEATURES,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right',
        progressBar: true,
      }
    ),
    BrowserAnimationsModule
  ],
  providers: [NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
