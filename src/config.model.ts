export interface IStripeCheckoutToken {
  id: string;
  email: string;
}

export interface IStripeCheckoutCallback {
  (token: IStripeCheckoutToken, args?: any): void;
}

export interface IStripeCheckoutOpenCloseCallback {
  (): void;
}

export interface IStripeCheckoutOptions {
  // Highly recommended options.
  image?: string;
  name?: string;
  description?: string;
  amount?: number;
  locale?: string;
  zipCode?: boolean;
  billingAddress?: boolean;
  // Optional options.
  currency?: string;
  panelLabel?: string;
  shippingAddress?: boolean;
  email?: string;
  label?: string;
  allowRememberMe?: boolean;
  bitcoin?: boolean;
  opened?: IStripeCheckoutOpenCloseCallback;
  closed?: IStripeCheckoutOpenCloseCallback;
}

export interface IStripeCheckoutConfig extends IStripeCheckoutOptions {
  // Required options.
  key: string;
  token: IStripeCheckoutCallback;
}
