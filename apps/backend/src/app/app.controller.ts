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

/**
 * Controlador de nível base, responsável por operações globais na aplicação
 */
@Controller()
export class AppController {
  /**
   * Esse método retorna uma imagem para utilização no frontend
   * @param imgName Nome do arquivo de imagem armazenado
   * @param res Objeto de resposta do Express
   */
  @Get('uploads/:imgName')
  test(@Param('imgName') imgName: string, @Res() res) {
    return res.sendFile(imgName, { root: __dirname + '/uploads' });
  }

  /**
   * Esse método armazena arquivos recebidos através do Multer
   * @param file Arquivo recebido
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() file) {
    return file;
  }
}
