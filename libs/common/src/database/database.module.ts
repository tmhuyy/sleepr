import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return {
                    uri: configService.get<string>('MONGODB_URI'),
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]) {
        return MongooseModule.forFeature(models);
    }
}
