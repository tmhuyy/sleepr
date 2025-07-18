import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserDocument, UserSchema } from './models/user.schema';

@Module({
    imports: [
        DatabaseModule,
        DatabaseModule.forFeature([
            {
                name: UserDocument.name,
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
})
export class UsersModule {}
