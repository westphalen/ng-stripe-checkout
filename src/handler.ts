import { IStripeCheckoutConfig, IStripeCheckoutOptions, IStripeCheckoutToken, } from './config.model';

declare let StripeCheckout: any;

export class StripeCheckoutHandler {

  /**
   * Holds the Stripe Checkout instance.
   */
  private stripeCheckout: any;

  /**
   * Holds the current resolve function.
   *
   * @type {(token: IStripeCheckoutToken) => void}
   */
  private resolveFn: (token: IStripeCheckoutToken) => void;

  /**
   * Holds the current reject function.
   *
   * @type {(err: any) => void}
   */
  private rejectFn: (err: any) => void;

  /**
   * Constructor configures the Stripe Checkout handler with given config options.
   *
   * @param {IStripeCheckoutConfig} config
   */
  constructor(config: IStripeCheckoutConfig) {
    const tokenFn = config.token;

    config.token = (token, args) => {
      if (tokenFn != null) {
        tokenFn(token, args);
      }

      if (this.resolveFn != null) {
        this.resolveFn(token);
      }
    };

    this.stripeCheckout = StripeCheckout.configure(config);
  }

  /**
   * Open the Stripe Checkout window for this handler.
   *
   * @param {IStripeCheckoutOptions} options Options override initial config.
   * @returns {Promise<IStripeCheckoutToken>}
   */
  public open(options: IStripeCheckoutOptions): Promise<IStripeCheckoutToken> {
    const closedFn = options.closed;

    options.closed = () => {
      if (closedFn != null) {
        closedFn();
      }

      this.rejectFn('stripe_closed');
    };

    const promise = new Promise<IStripeCheckoutToken>((resolve, reject) => {
      this.resolveFn = resolve;
      this.rejectFn = reject;
    });

    this.stripeCheckout.open(options);

    return promise;
  }

  /**
   * Close the currently open Stripe Checkout window if any.
   */
  public close(): void {
    this.stripeCheckout.close();
  }

}
