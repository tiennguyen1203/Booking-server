import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { Role } from '../../../constant';
import { Location } from '../../../entities';
import { User } from '../../../entities/user.entity';
import { BaseLocationTypeRepository } from '../../../modules/base/location-types/location-type.repository';
import { BaseUsersService } from '../../../modules/base/user/users.service';
import { JwtBody } from '../../../modules/customer/auth/auth.service';
import PasswordServices from '../../../services/service.password';
import { BaseLocationRepository } from '../../base/locations/location.repository';
import { CreateUserDto } from './dto/create-uat.dto';
import { AdminAuthResponse } from './interfaces/index';
import { SuperAdminUserRepository } from './user.repository';

@Injectable()
export class SuperAdminUsersService extends BaseUsersService {
  passwordServices: typeof PasswordServices;
  constructor(
    private readonly superAdminUserRepository: SuperAdminUserRepository,
    private readonly baseLocationRepository: BaseLocationRepository,
    private readonly baseLocationTypeRepository: BaseLocationTypeRepository,
    private readonly jwtService: JwtService,
  ) {
    super(superAdminUserRepository);
    this.passwordServices = PasswordServices;
  }

  async createUser(createUserDto: CreateUserDto): Promise<AdminAuthResponse> {
    const existUser = await this.superAdminUserRepository.findOneByEmail(
      createUserDto.email,
    );

    if (existUser) {
      throw new BadRequestException('User already exist');
    }

    let location: Location;
    if (createUserDto.locationId) {
      location = await this.baseLocationRepository.findOne(
        createUserDto.locationId,
      );
      if (!location) {
        throw new NotFoundException('Location not found');
      }
      if (location.userId) {
        throw new BadRequestException('Location is managed by 1 user only');
      }
    } else {
      const locationTypes = await this.baseLocationTypeRepository.find();
      location = new Location();
      location.name = createUserDto.fullName;
      location.locationTypeId = locationTypes[0].id;
      location.id = uuid();
    }

    const userId = uuid();
    location.userId = userId;
    await location.save();
    const newUser = new User();
    newUser.id = userId;
    newUser.fullName = createUserDto.fullName;
    newUser.email = createUserDto.email;
    newUser.role = Role.ADMIN;
    newUser.password = this.passwordServices.hashSync(createUserDto.password);

    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    await newUser.save();

    delete newUser.password;
    const jwtBody: JwtBody = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    const accessToken: string = this.jwtService.sign(jwtBody);
    return {
      user: newUser,
      location,
      accessToken,
      success: true,
    };
  }
}
