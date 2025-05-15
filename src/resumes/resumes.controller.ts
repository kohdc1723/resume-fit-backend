import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('resumes')
export class ResumesController {
  @Get()
  findAll(@Query('userId') userId?: string) {
    return { userId };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() resume: object) {
    return resume;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() resume: object) {
    return { id, ...resume };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id };
  }
}
