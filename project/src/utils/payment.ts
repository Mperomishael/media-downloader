interface PaymentConfig {
  amount: number;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
}

export const initializePayment = (config: PaymentConfig) => {
  const paymentConfig = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now().toString(),
    amount: config.amount,
    currency: 'NGN',
    payment_options: 'card,ussd,banktransfer',
    customer: config.customer,
    customizations: config.customizations,
    callback: (response: any) => {
      if (response.status === 'successful') {
        window.location.href = '/thank-you';
      }
      closePaymentModal();
    },
    onclose: () => {
      // Handle modal close
    }
  };

  // Initialize payment
  window.FlutterwaveCheckout(paymentConfig);
};