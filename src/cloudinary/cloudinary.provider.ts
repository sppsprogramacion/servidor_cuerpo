import { ConfigService } from '@nestjs/config';
import { Config } from 'aws-sdk';
import { v2 } from 'cloudinary';
import { CLOUDINARY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET } from 'src/config/constants';



export const CloudinaryProvider = {
  inject: [ConfigService],
  provide: CLOUDINARY,
  useFactory: (config: ConfigService) => {
    return v2.config({
      cloud_name:  config.get<string>(CLOUDINARY_CLOUD_NAME),
      api_key: config.get<string>(CLOUDINARY_API_KEY),
      api_secret: config.get<string>(CLOUDINARY_API_SECRET),
     // secure: true    
      
    });
  },
};