import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Location } from '../../../entities';
import { CustomerLocationsService } from './locations.service';

@Controller('customer/locations')
export class CustomerLocationController {
    constructor(private customerLocationService: CustomerLocationsService) {}

    @Get()
    getAllLocations(): Promise<Location[]> {
        return this.customerLocationService.getAllLocations();
    }
}