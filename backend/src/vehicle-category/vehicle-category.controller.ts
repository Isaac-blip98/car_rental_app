import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { VehicleCategoryService } from './vehicle-category.service';
import { CreateVehicleCategoryDto } from './dtos/create-vehicle-category.dto';
import { UpdateVehicleCategoryDto } from './dtos/update-vehicle-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/roles.enum';

@Controller('vehicle-categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class VehicleCategoryController {
  constructor(private service: VehicleCategoryService) {}

  @Post()
  create(@Body() dto: CreateVehicleCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVehicleCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
