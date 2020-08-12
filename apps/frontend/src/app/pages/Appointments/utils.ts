import moment from 'moment';

export function convertTimeToSeconds(time: string) {
  const [hour, minutes, seconds] = time.split(':').map(Number);
  return hour * 60 * 60 + minutes * 60 + seconds;
}

export function convertSecondsToTime(num: number) {
  const duration = moment.duration(num, 'seconds');
  const days = duration.days() !== 0 && `${duration.days()} dias`;
  const hours = duration.hours() !== 0 && `${duration.hours()} horas`;
  const minutes = duration.minutes() !== 0 && `${duration.minutes()} minutos`;
  const seconds = duration.seconds() !== 0 && `${duration.seconds()} segundos`;
  const timeArr = [days, hours, minutes, seconds].filter(Boolean);
  return timeArr.join(', ');
}
