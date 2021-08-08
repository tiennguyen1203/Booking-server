import { IsString } from 'class-validator';

export class SignUpMerchantDto {
  @IsString()
  returnUrl: string;
}

export class SignUpMerchantCallbackDto {
  @IsString()
  paypalMerchantId: string;
}
