import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
} from '@nestjs/common';

import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('uploads/:imgPath')
  test(@Param('imgPath') imgPath, @Res() res) {
    return res.sendFile(imgPath, { root: __dirname + '/uploads' });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() file) {
    return file;
  }
}
