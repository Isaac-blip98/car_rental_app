import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { VehicleResponseDto } from './dtos/vehicle-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';

@Controller('vehicles')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.AGENT)
  create(
    @Body() dto: CreateVehicleDto & { imageUrls: string[] },
  ): Promise<VehicleResponseDto> {
    return this.vehicleService.create(dto);
  }

  @Get()
  findAll(): Promise<VehicleResponseDto[]> {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<VehicleResponseDto> {
    return this.vehicleService.findOne(id);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.vehicleService.delete(id);
  }

  @Patch(':id/availability')
  updateAvailability(
    @Param('id') id: string,
    @Body() body: { isAvailable: boolean },
  ) {
    return this.vehicleService.updateAvailability(id, body.isAvailable);
  }
}
