import { message } from 'antd';

/**
 * Esse método realiza verificação na image, confirma que ela está no formato JPEG ou PNG
 * @param file A imagem enviada pelo usuário
 */
export function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Você só deve mandar arquivos JPG ou PNG!');
  }
  return isJpgOrPng;
}

/**
 * Esse método converte arquivos de imagem em base 64 para facilitar o armazenamento
 * @param img Arquivo de imagem enviado posteriormente
 * @param callback Callback para agir sobre o arquivo de imagem
 */
export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

/**
 * Constantes de layout da página principal
 */
export const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export const tailLayout = {
  wrapperCol: { span: 8, offset: 8 },
};
