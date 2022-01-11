import { Injectable, Req, Res, BadRequestException } from '@nestjs/common';
import * as AWS from "aws-sdk";
import { S3_ACCESS_KEY, S3_BUCKET_PDF, S3_SECRET_ACCESS_KEY } from '../config/constants';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class S3Service{
    constructor(
        private config: ConfigService
    ){}
        
    AWS_S3_BUCKET = this.config.get<string>(S3_BUCKET_PDF);
    s3 = new AWS.S3(
        {
        accessKeyId: this.config.get<string>(S3_ACCESS_KEY),
        secretAccessKey: this.config.get<string>(S3_SECRET_ACCESS_KEY),
    }
    );
    async uploadFile(file){
        try {
            const prefijo = "Legajos-Archivos/";
            const { originalname } = file;
            return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype, prefijo);
        } catch (error) {
            return new BadRequestException(error.message);
        }
    }

    async s3_upload(file, bucket, name, mimetype, prefijo)
    {
        const params = 
        {
            Bucket: bucket,
            Key: `${prefijo}${uuid()}_${String(name)}`,
            Body: file,
            ACL: "public-read",
            ContentType: mimetype,
            ContentDisposition:"inline",
            CreateBucketConfiguration: 
            {
                LocationConstraint: "ap-south-1"
            }
        };

        try
        {
            let s3Response = await this.s3.upload(params).promise();
           
            return s3Response;
        }
        catch (e)
        {           
            throw new Error(e.message);            
        }
    }

    async s3_getPdf(key: string){
        try {
            let params = {
                Bucket: this.config.get<string>(S3_BUCKET_PDF),
                Key: key,
            };
             const stream = this.s3.getObject(params).createReadStream();
           
             return stream;            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async s3_deletePdf(key: string){
        // import { DeleteObjectCommand } from "@aws-sdk/client-s3";
        // import { s3Client } from "./libs/s3Client.js" // Helper function that creates Amazon S3 service client module.
        
        const bucketParams = { 
            Bucket: this.config.get<string>(S3_BUCKET_PDF),
            Key: key 
        };
        
        const run = async () => {
          try {
            //const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
            const data = await this.s3.deleteObject(bucketParams).promise();
            console.log("Success. Object deleted.", data);
            return data; // For unit tests.
          } catch (err) {
            console.log("Error", err);
          }
        };
        run();
        
    }
}