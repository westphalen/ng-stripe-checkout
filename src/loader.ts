import { Injectable } from '@angular/core';
import { StripeCheckoutHandler } from './handler';
import { IStripeCheckoutConfig } from './config.model';

@Injectable()
export class StripeCheckoutLoader {

  private loaded: Promise<void>;

  /**
   * Create a Stripe Checkout instance as soon as Stripe has loaded.
   * @param {IStripeCheckoutConfig} config
   * @returns {Promise<StripeCheckoutHandler>}
   */
  public createHandler(config: IStripeCheckoutConfig): Promise<StripeCheckoutHandler> {
    return this.load().then(() => {
      return new StripeCheckoutHandler(config);
    });
  }

  /**
   * Load or wait for the Stripe checkout library to load.
   * @returns {Promise<void>}
   */
  public load(): Promise<void> {
    if (!this.loaded) {
      // No cached Promise exist, so we have to load checkout.js.
      this.loaded = new Promise<void>((resolve, reject) => {
        // Create script element.
        let script: any = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://checkout.stripe.com/checkout.js';
        script.onerror = (e: any) => reject(e);
        if (script.readyState) {  // IE fallback.
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              resolve();
            }
          };
        } else {  // Other browsers.
          script.onload = () => {
            resolve();
          };
        }
        document.getElementsByTagName('body')[0].appendChild(script);
      });
    }

    // Return cached Promise.
    return this.loaded;
  }
}
