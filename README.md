# Angular Stripe Checkout

Angular 2+ component for Stripe's Checkout feature.

[![Build Status](https://travis-ci.org/westphalen/ng-stripe-checkout.svg?branch=master)](https://travis-ci.org/westphalen/ng-stripe-checkout)

## Installation

You can install the package with the following command:

```shell
npm install ng-stripe-checkout
```

## Usage

#### 1. Import the `StripeCheckoutModule`:

This is typically done in your `app.module.ts`:
```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StripeCheckoutModule} from 'ng-stripe-checkout';

@NgModule({
    imports: [
        BrowserModule,
        StripeCheckoutModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 2. Inject the StripeCheckoutLoader

Wherever you need to utilize Stripe Checkout, inject the service `StripeCheckoutLoader` in your constructor.
```ts
import {Component} from '@angular/core';
import {StripeCheckoutLoader} from 'ng-stripe-checkout';

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class App {
    constructor(private stripeCheckoutLoader: StripeCheckoutLoader) { }
}
```

#### 3. Create a Stripe Checkout handler

The Stripe Checkout handler is essentially a readily configured Stripe Checkout window, prepared to open when you need it.
The `createHandler` method takes the configuration options you know from the Stripe Checkout documentation. Required options are: `key` and `token`.

```ts
import {Component} from '@angular/core';
import {StripeCheckoutLoader, StripeCheckoutHandler} from 'ng-stripe-checkout';

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class App {
    private stripeCheckoutHandler: StripeCheckoutHandler;

    constructor(private stripeCheckoutLoader: StripeCheckoutLoader) { }

    public ngAfterViewInit() {
        this.stripeCheckoutLoader.createHandler({
            key: 'pk_test_abcdefghijklmnopqrstuvwxyz',
            token: (token) => {
                // Do something with the token...
                console.log('Payment successful!', token);
            }
        }).then((handler: StripeCheckoutHandler) => {
            this.stripeCheckoutHandler = handler;
        });
    }
}
```

#### 4. Open the Stripe Checkout window to begin payment flow.

Finally, you may trigger `open` somewhere in your code, to open the payment window.
The `open` method takes the Stripe Checkout configuration options again, but this time `key` and `token` are not required.
Use this to set amount, user's email and other things that might change from each time the window is opened.
After payment, the `token` callback will be triggered (see step 3 above).
```ts
import {Component} from '@angular/core';
import {StripeCheckoutLoader, StripeCheckoutHandler} from 'ng-stripe-checkout';

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class App {
    private stripeCheckoutHandler: StripeCheckoutHandler;

    constructor(private stripeCheckoutLoader: StripeCheckoutLoader) { }

    public ngAfterViewInit() {
        this.stripeCheckoutLoader.createHandler({
            key: 'pk_test_abcdefghijklmnopqrstuvwxyz',
            token: (token) => {
                // Do something with the token...
                console.log('Payment successful!', token);
            },
        }).then((handler: StripeCheckoutHandler) => {
            this.stripeCheckoutHandler = handler;
        });
    }

    public onClickBuy() {
        this.stripeCheckoutHandler.open({
            amount: 1500,
            currency: 'EUR',
        });
    }

    public onClickCancel() {
        // If the window has been opened, this is how you can close it:
        this.stripeCheckoutHandler.close();
    }
}
```

### New in 1.0.4

The open method now returns a promise, while still being fully backwards compatible.
Using the promise handlers lets you simplify your code, as you don't have to configure separate callback functions to receive the token.

Example:

```ts
this.stripeCheckoutHandler.open({
    amount: 1500,
    currency: 'EUR',
}).then((token) => {
    // Do something with the token...
    console.log('Payment successful!', token);
}).catch((err) => {
    // Payment failed or was canceled by user...
    if (err !== 'stripe_closed') {
        throw err;
    }
});
```

