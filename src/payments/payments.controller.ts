import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Roles } from 'src/common/auth/role.decorator';
import { RoleGuard } from 'src/common/auth/role.guard';
import { AuthGuard } from 'src/common/auth/auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Post('create-many')
  @Roles('admin')
  @UseGuards(RoleGuard)
  createMany(@Body() createUserDto: CreatePaymentDto[]) {
    return this.paymentsService.createMany(createUserDto);
  }

  @Get()
  @Roles('admin')
  @UseGuards(RoleGuard)
  findAll() {
    return this.paymentsService.findAll();
  }
  
  @UseGuards(AuthGuard)
  @Get('mine')
  async getMe(@Req() req){
    const userId = req.user.data.id;

    return this.paymentsService.getMine(userId)
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
