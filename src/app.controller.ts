import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsNotEmpty, IsString } from 'class-validator';
import { AppService } from './app.service';
import { S3Adapter } from './lib/aws/s3';

class SignedUrlS3Dto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly s3Adapter: S3Adapter,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('app/config')
  getAppConfig(): Promise<any> {
    return this.appService.getAppConfig();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('signed-url-s3')
  signedUrlS3(@Body() { fileName, type }: SignedUrlS3Dto) {
    return this.s3Adapter.getSignedUrl({ pathFile: fileName, fileType: type });
  }
}
