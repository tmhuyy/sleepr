import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstarctRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger;
    constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });
        return (await createdDocument.save()).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model
            .findOne(filterQuery)
            .lean<TDocument>(true); // just return a plain object

        if (!document) {
            this.logger.warn(
                `Document was not found with filterQuery`,
                filterQuery,
            );

            throw new NotFoundException(`Document was not found`);
        }

        return document;
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>,
    ): Promise<TDocument> {
        const document = await this.model
            .findOneAndUpdate(filterQuery, update, {
                new: true, // return a new object after updating
            })
            .lean<TDocument>(true);

        if (!document) {
            this.logger.warn(
                `Document was not found with filterQuery`,
                filterQuery,
            );

            throw new NotFoundException(`Document was not found`);
        }

        return document;
    }

    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return await this.model.find(filterQuery).lean<TDocument[]>(true);
    }

    async findOneAndDelete(
        filterQuery: FilterQuery<TDocument>,
    ): Promise<TDocument> {
        return await this.model
            .findOneAndDelete(filterQuery)
            .lean<TDocument>(true);
    }
}
