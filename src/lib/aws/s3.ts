import { HttpException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_S3_BUCKET,
  AWS_SECRET_ACCESS_KEY,
} from '../../constant/index';

const getDateString = function () {
  const now = new Date();
  const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const month =
    now.getMonth() < 9 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  return `${day}-${month}-${now.getFullYear()}`;
};

const getRandomString = function () {
  return (Math.random() + 1).toString(36).substring(7);
};

const getFileName = function (fileName: string, prependDate?: boolean) {
  const index = fileName.indexOf('.');
  const file = fileName.substring(0, index);
  const extension = fileName.substring(index);
  const name = file + '-' + getRandomString() + extension;

  if (prependDate) {
    return getDateString() + '/' + name;
  }
  return name;
};

export class S3Adapter {
  bucket: string;
  s3: S3;
  constructor() {
    this.bucket = AWS_S3_BUCKET;
    this.s3 = new S3({
      params: { Bucket: this.bucket },
      region: AWS_REGION,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });
  }

  async deleteFile(url: string) {
    const words = url.split('/');
    return await this.s3
      .deleteObject({
        Bucket: this.bucket,
        Key: words[words.length - 1],
      })
      .promise();
  }

  getSignedUrl({
    pathFile,
    fileType,
  }: {
    pathFile: string;
    fileType: string;
  }): Promise<any> {
    const fileName = getFileName(pathFile);
    const s3Params = {
      Bucket: this.bucket,
      Key: fileName,
      ACL: 'public-read',
      ContentType: fileType,
      Expires: 5 * 60, //time to expire in seconds (6 minutes)
    };

    try {
      return new Promise((resolve, reject) => {
        this.s3.getSignedUrl('putObject', s3Params, (err, uploadUrl) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              uploadUrl,
              fileName,
              fileUrl: `https://${this.bucket}.s3.amazonaws.com/${fileName}`,
            });
          }
        });
      });
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }
}
