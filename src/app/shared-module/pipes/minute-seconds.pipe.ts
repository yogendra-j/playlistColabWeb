import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds',
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return '00:00';
    }
    const minutes: number = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    //pad '0' incase less than 10
    return (
      minutes.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ':' +
      seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );
  }
}
