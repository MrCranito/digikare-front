import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { AuthActions } from "src/app/shared/store/actions/auth.action";
import { EventsAction } from "src/app/shared/store/actions/events.action";
import { selectUser } from "src/app/shared/store/selectors/users.selector";
import { Event } from "src/app/shared/models/event/event.model";
import { User } from "src/app/shared/models/user/user.model";
import { selectEventIsLoading } from "src/app/shared/store/selectors/events.selector";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

    currentUser$ = this.store.pipe(select(selectUser));
    isLoading$ = this.store.pipe(select(selectEventIsLoading));

    user: User | null = null

    form = new FormGroup({
        'email': new FormControl(false, []),
        'sms': new FormControl(false, []),
    })

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.currentUser$.subscribe((user) => {
            this.user = user
            if (user && user?.consents?.length) {
                this.form.get('email')!.setValue(user.consents.find(consent => consent.id === 'email_notifications')!.enabled)
                this.form.get('sms')!.setValue(user.consents.find(consent => consent.id === 'sms_notifications')!.enabled)
            }
        })
    }

    selectSMS(event: any) {
        this.form.get('sms')!.setValue(event.target.checked)
    }

    selectEmail(event: any) {
        this.form.get('email')!.setValue(event.target.checked)
    }

    logOut() {
        this.store.dispatch(AuthActions.logout());
    }

    updateConsents() {
        const email = this.form.get('email')!.value
        const sms = this.form.get('sms')!.value

        const event: Event = {
            id: null,
            consents: [{
                id: 'sms_notifications',
                enabled: sms!.valueOf()
            }, {
                id: 'email_notifications',
                enabled: email!.valueOf()
            }]
        }

        this.store.dispatch(EventsAction.createEvent({ event, userId: this.user!.id }));
    }
}