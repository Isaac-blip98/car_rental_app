import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VehicleFeatureService } from './vehicle-feature.service';
import { CreateVehicleFeatureDto } from './dtos/create-vehicle-feature.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/roles.enum';

@Controller('vehicle-features')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class VehicleFeatureController {
  constructor(private service: VehicleFeatureService) {}

  @Post()
  create(@Body() dto: CreateVehicleFeatureDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
