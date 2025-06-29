import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FilesInterceptor('images')) 
  create(
    @Body() dto: CreateVehicleDto,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<VehicleResponseDto> {
    return this.vehicleService.create(dto, images);
  }

  @Get()
  findAll(): Promise<VehicleResponseDto[]> {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<VehicleResponseDto> {
    return this.vehicleService.findOne(id);
  }
}
