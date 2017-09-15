import { NgModule } from '@angular/core';
import { StripeCheckoutLoader } from './loader';

@NgModule({
  providers: [
    StripeCheckoutLoader,
  ],
})
export class StripeCheckoutModule {}
