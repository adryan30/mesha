import axios from 'axios';
import * as moment from 'moment';
import { message as toaster } from 'antd';

export const apiURL = 'http://localhost:3333/api';

export const api = axios.create({ baseURL: apiURL });

/**
 * Esse metódo retorna uma string que representa a localização de uma foto do servidor
 * @param photoId ID da foto que foi armazenada no servidor
 */
export const getPhotoUrl = (photoId: string) => `${apiURL}/uploads/${photoId}`;

/**
 * Espaçamento para Formulários e Botões de formulário
 */
export const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

export const formActionsLayout = {
  wrapperCol: { span: 8, offset: 8 },
};

/**
 * Esse método realiza verificação na image, confirma que ela está no formato JPEG ou PNG
 * @param file A imagem enviada pelo usuário
 */
export const checkIfFileIsImage = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) toaster.error('Você só deve mandar arquivos JPG ou PNG!');
  return isJpgOrPng;
};

/**
 * Esse método converte arquivos de imagem em base 64 para facilitar o armazenamento
 * @param img Arquivo de imagem enviado posteriormente
 * @param callback Callback para agir sobre o arquivo de imagem
 */
export const imageToBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

/**
 * Esse método retorna uma string que representa a duração (desde dias até segundos)
 * @param num Número de segundos em uma duração
 */
export function formatSecondsToTime(num: number) {
  const duration = moment.duration(num, 'seconds');
  const days = duration.days() !== 0 && `${duration.days()} dias`;
  const hours = duration.hours() !== 0 && `${duration.hours()} horas`;
  const minutes = duration.minutes() !== 0 && `${duration.minutes()} minutos`;
  const seconds = duration.seconds() !== 0 && `${duration.seconds()} segundos`;
  const timeArr = [days, hours, minutes, seconds].filter(Boolean);
  return timeArr.join(', ');
}
