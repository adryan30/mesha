import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  @Get('uploads/:imgName')
  test(@Param('imgName') imgName: string, @Res() res) {
    return res.sendFile(imgName, { root: __dirname + '/uploads' });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() file) {
    return file;
  }
}
