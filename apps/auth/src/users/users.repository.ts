import { AbstractRepository } from '@app/common';
import { UserDocument, UserSchema } from './models/user.schema';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class UserRepository extends AbstractRepository<UserDocument> {
    protected readonly logger = new Logger(UserRepository.name);

    constructor(
        @InjectModel(UserDocument.name)
        userModel: Model<UserDocument>,
    ) {
        super(userModel);
    }
}
