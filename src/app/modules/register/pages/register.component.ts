import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { User } from "src/app/shared/models/user/user.model";
import { UsersActions } from "src/app/shared/store/actions/users.action";
import { selectIsLoadingUser } from "src/app/shared/store/selectors/users.selector";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {

    isLoading$ = this.store.pipe(select(selectIsLoadingUser))

    constructor(
        private store: Store,
    ) { }

    form = new FormGroup({
        'email' : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[a-zA-Z0-9]*$')])
    })

    ngOnInit(): void {
        this.form.valueChanges.subscribe((_) => {
            this.form.markAsTouched()
        })
    }

    onSubmit() {
        const email = this.form.get('email')!.value

        const user: User = {
            id: null,
            email,
            consents: []
        }

        this.store.dispatch(UsersActions.createUser({ user }))
    }
}


