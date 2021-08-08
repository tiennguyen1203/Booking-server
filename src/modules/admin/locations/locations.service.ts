import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpMerchantDto } from '../../../dto/location/sign-up-merchant.dto';
import { UpdateLocationDto } from '../../../dto/location/update-location.dto';
import {
  createPartnerReferral,
  trackMerchant,
} from '../../../lib/payment-gateway/paypal';
import { BaseLocationsService } from '../../base/locations/locations.service';
import { AdminLocationRepository } from './location.repository';

@Injectable()
export class AdminLocationsService extends BaseLocationsService {
  constructor(
    @InjectRepository(AdminLocationRepository)
    private readonly adminLocationRepository: AdminLocationRepository,
  ) {
    super(adminLocationRepository);
  }

  async updateLocation({
    locationId,
    updateLocationDto,
  }: {
    locationId: string;
    updateLocationDto: UpdateLocationDto;
  }) {
    await this.adminLocationRepository.update(locationId, updateLocationDto);
    return this.adminLocationRepository.findOne(locationId);
  }

  async signUpMerchant(locationId: string, { returnUrl }: SignUpMerchantDto) {
    return createPartnerReferral({ locationId, returnUrl });
  }

  async signUpMerchantCallback(locationId: string, paypalMerchantId: string) {
    const merchantInfo = await trackMerchant(paypalMerchantId);
    if (!merchantInfo) {
      throw new BadRequestException('Incorrect MerchantId');
    }

    const locationUpdate = await this.adminLocationRepository.findOne(
      locationId,
    );
    locationUpdate.paypalMerchantId = paypalMerchantId;
    await this.adminLocationRepository.save(locationUpdate);

    return {
      success: true,
    };
  }
}
