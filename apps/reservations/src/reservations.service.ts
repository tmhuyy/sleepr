import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
    constructor(
        private readonly reservationRepository: ReservationRepository,
    ) {}
    create(createReservationDto: CreateReservationDto) {
        return this.reservationRepository.create({
            ...createReservationDto,
            timestamp: new Date(),
            userId: 'TEST',
        });
    }

    findAll() {
        return this.reservationRepository.find({});
    }

    findOne(id: string) {
        return this.reservationRepository.findOne({ _id: id });
    }

    update(id: string, updateReservationDto: UpdateReservationDto) {
        return this.reservationRepository.findOneAndUpdate(
            { _id: id },
            { $set: updateReservationDto },
        );
    }

    remove(id: string) {
        return this.reservationRepository.findOneAndDelete({ _id: id });
    }
}
