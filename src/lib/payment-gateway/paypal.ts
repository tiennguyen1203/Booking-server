import { BadRequestException } from '@nestjs/common';
import paypal from '@paypal/checkout-server-sdk';
import got from 'got';
import { round } from 'lodash';
import {
  PAYMENT_STATUS,
  PAYPAL_API_URL,
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  PAYPAL_PARTNER_ATTRIBUTION_ID,
  PAYPAL_PARTNER_MERCHANT_ID,
} from '../../constant/index';
const paypalEnvironment = new paypal.core.SandboxEnvironment(
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
);
const paypalAccessToken = paypalEnvironment.authorizationString();
const client = new paypal.core.PayPalHttpClient(paypalEnvironment);

export enum PAYPAL_FEATURE {
  PAYMENT = 'PAYMENT',
  REFUND = 'REFUND',
  FUTURE_PAYMENT = 'FUTURE_PAYMENT',
  DIRECT_PAYMENT = 'DIRECT_PAYMENT',
  PARTNER_FEE = 'PARTNER_FEE',
  DELAY_FUNDS_DISBURSEMENT = 'DELAY_FUNDS_DISBURSEMENT',
  READ_SELLER_DISPUTE = 'READ_SELLER_DISPUTE',
  UPDATE_SELLER_DISPUTE = 'UPDATE_SELLER_DISPUTE',
  ADVANCED_TRANSACTIONS_SEARCH = 'ADVANCED_TRANSACTIONS_SEARCH',
  SWEEP_FUNDS_EXTERNAL_SINK = 'SWEEP_FUNDS_EXTERNAL_SINK',
  ACCESS_MERCHANT_INFORMATION = 'ACCESS_MERCHANT_INFORMATION',
  TRACKING_SHIPMENT_READWRITE = 'TRACKING_SHIPMENT_READWRITE',
  INVOICE_READ_WRITE = 'INVOICE_READ_WRITE',
  DISPUTE_READ_BUYER = 'DISPUTE_READ_BUYER', // Read the buyer disputes.
  UPDATE_CUSTOMER_DISPUTES = 'UPDATE_CUSTOMER_DISPUTES', // Update the buyer disputes.
}

export enum PAYPAL_PRODUCT_NAME {
  EXPRESS_CHECKOUT = 'EXPRESS_CHECKOUT', // Express checkout product
  PPPLUS = 'PPPLUS', // Paypal PLUS product
  WEBSITE_PAYMENT_PRO = 'WEBSITE_PAYMENT_PRO', // Paypal Professional product
  PPCP = 'PPCP', // PayPal Complete Payments product
}

type CreatePartnerReferral = {
  href: string;
  rel: string;
  method: string;
  description: string;
};

type CreatePaypalOrderResponse = {
  id: string;
  status: string;
  link: {
    href: string;
    rel: string;
    method: string;
  };
};

export const createPartnerReferral = async ({
  paypalFeatures = [PAYPAL_FEATURE.PAYMENT, PAYPAL_FEATURE.REFUND],
  paypalProducts = [PAYPAL_PRODUCT_NAME.EXPRESS_CHECKOUT],
  locationId,
  returnUrl,
}: {
  paypalFeatures?: PAYPAL_FEATURE[];
  paypalProducts?: PAYPAL_PRODUCT_NAME[];
  locationId: string;
  returnUrl: string;
}): Promise<CreatePartnerReferral> => {
  const createPartnerReferralInput = {
    tracking_id: locationId,
    partner_config_override: {
      return_url: returnUrl,
    },
    operations: [
      {
        operation: 'API_INTEGRATION',
        api_integration_preference: {
          rest_api_integration: {
            integration_method: 'PAYPAL',
            integration_type: 'THIRD_PARTY',
            third_party_details: {
              features: paypalFeatures,
            },
          },
        },
      },
    ],
    products: paypalProducts,
    legal_consents: [
      {
        type: 'SHARE_DATA_CONSENT',
        granted: true,
      },
    ],
  };

  const result = await got.post(
    `${PAYPAL_API_URL}/v2/customer/partner-referrals`,
    {
      headers: {
        Authorization: paypalAccessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(createPartnerReferralInput),
    },
  );
  const { links } = JSON.parse(result.body);
  return links?.[1];
};

export const createPaypalOrder = async ({
  returnUrl,
  cancelUrl,
  currency = 'USD',
  amountValue,
  payeeMerchantId,
}: {
  returnUrl: string;
  cancelUrl: string;
  currency?: string;
  amountValue: number;
  payeeMerchantId?: string;
}): Promise<CreatePaypalOrderResponse> => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.payPalPartnerAttributionId(PAYPAL_PARTNER_ATTRIBUTION_ID);

  const purchase_unit = {
    amount: {
      currency_code: currency,
      value: round(amountValue, 2),
    },
  };
  if (payeeMerchantId) {
    (purchase_unit as any).payee = payeeMerchantId;
  }

  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [purchase_unit],
    application_context: {
      return_url: returnUrl,
      cancel_url: cancelUrl,
    },
  });

  // Call API with your client and get a response for your call
  const response = await client.execute(request);
  return {
    ...response.result,
    link: response.result.links[1],
  };
};

export const capturePaypalOrder = async (orderId: string) => {
  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const response = await client.execute(request);
    return response.result;
  } catch (err) {
    return false;
  }
};

export const trackMerchant = async (paypalMerchantId: string) => {
  const result = await got.get(
    `${PAYPAL_API_URL}/v1/customer/partners/${PAYPAL_PARTNER_MERCHANT_ID}/merchant-integrations/${paypalMerchantId}`,
    {
      headers: {
        Authorization: paypalAccessToken,
        'Content-Type': 'application/json',
      },
    },
  );

  const merchantInfo = JSON.parse(result.body);
  if (merchantInfo.merchant_id !== paypalMerchantId) {
    throw new BadRequestException('Incorrect merchantId');
  }

  return merchantInfo;
};

export const getPaypalOrder = async (orderId) => {
  const result = await got.get(
    `${PAYPAL_API_URL}/v2/checkout/orders/${orderId}`,
    {
      headers: {
        Authorization: paypalAccessToken,
        'Content-Type': 'application/json',
      },
    },
  );

  return JSON.parse(result.body) as {
    id: string;
    intent: string;
    status: PAYMENT_STATUS;
    purchase_units: any[];
    payer: {
      name: {
        given_name: string;
        surname: string;
      };
      email_address: string;
      payer_id: string;
      address: {
        country_code: string;
      };
    };
    links: { href: string; rel: string; method: string }[];
  };
};
