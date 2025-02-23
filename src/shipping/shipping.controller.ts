import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { Roles } from 'src/common/auth/role.decorator';
import { AuthGuard } from 'src/common/auth/auth.guard';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}
  @Roles('admin')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createShippingDto: CreateShippingDto) {
    return this.shippingService.create(createShippingDto);
  }

  @Post('create-many')
  @Roles('admin')
  @UseGuards(AuthGuard)
  createMany(@Body() createUserDto: CreateShippingDto[]) {
    return this.shippingService.createMany(createUserDto);
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.shippingService.findAll();
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateShippingDto: UpdateShippingDto,
  ) {
    return this.shippingService.update(+id, updateShippingDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.shippingService.remove(+id);
  }
}
