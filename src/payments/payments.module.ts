import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payments } from './payment.model';
import { SharingModule } from 'src/common/sharing.module';

@Module({
  imports: [SequelizeModule.forFeature([Payments]), SharingModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
