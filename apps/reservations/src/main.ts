import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(ReservationsModule);
    // global validation
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    /// logger service by Pino
    app.useLogger(app.get(Logger));

    await app.listen(process.env.port ?? 3000);
}
bootstrap();
