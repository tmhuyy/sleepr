import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ReservationDocument extends AbstractDocument {
    @Prop()
    timestamp: Date;
    @Prop()
    startDate: Date;
    @Prop()
    endDate: Date;
    @Prop()
    userId: string;
    @Prop()
    placeId: string;
    @Prop()
    invoiceId: string;
}

export const ReservationSchema =
    SchemaFactory.createForClass(ReservationDocument);
