import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(ReservationsModule);
    // global validation
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    /// logger service by Pino
    app.useLogger(app.get(Logger));
    const configService = app.get(ConfigService);
    await app.listen(configService.get<string>('RESERVATION_PORT'));
}
bootstrap();
