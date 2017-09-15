import { IStripeCheckoutConfig, IStripeCheckoutOptions } from './config.model';

declare let StripeCheckout: any;

export class StripeCheckoutHandler {

  /**
   * Holds the Stripe Checkout instance.
   */
  private stripeCheckout: any;

  /**
   * Constructor configures the Stripe Checkout handler with given config options.
   * @param {IStripeCheckoutConfig} config
   */
  constructor(config: IStripeCheckoutConfig) {
    this.stripeCheckout = StripeCheckout.configure(config);
  }

  /**
   * Open the Stripe Checkout window for this handler.
   * @param {IStripeCheckoutOptions} options Options override initial config.
   */
  public open(options: IStripeCheckoutOptions): void {
    this.stripeCheckout.open(options);
  }

  /**
   * Close the currently open Stripe Checkout window if any.
   */
  public close(): void {
    this.stripeCheckout.close();
  }

}
