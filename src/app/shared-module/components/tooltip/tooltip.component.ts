import { Component, Input, OnInit } from '@angular/core';
import { MinuteSecondsPipe } from '../../pipes/minute-seconds.pipe';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
  providers: [MinuteSecondsPipe],
})
export class TooltipComponent implements OnInit {
  @Input() songDuration: number = 0;
  constructor(private formatToMinSecPipe: MinuteSecondsPipe) {
    console.log(this.formatToMinSecPipe, 'TooltipComponent');
  }

  ngOnInit(): void {
    const progressBarWrapper = document.querySelector(
      '.tooltipProgressBar'
    ) as HTMLElement;
    if (progressBarWrapper) {
      progressBarWrapper.addEventListener(
        'mousemove',
        this.pregressBarMouseEnterHandler
      );
      progressBarWrapper.addEventListener(
        'mouseleave',
        this.pregressBarMouseLeaveHandler
      );
    }
  }
  // show hover time value in progress bar
  pregressBarMouseEnterHandler = (event: MouseEvent) => {
    const progressBarWrapper = document.querySelector(
      '.mat-slider-ticks'
    ) as HTMLElement;
    if (progressBarWrapper) {
      const progressBarWrapperRect = progressBarWrapper.getBoundingClientRect();
      const progressBarWidth =
        progressBarWrapperRect.right - progressBarWrapperRect.left;
      const progressBarX = event.clientX - progressBarWrapperRect.left;
      const progressBarPercent = progressBarX / progressBarWidth;
      const progressBarTime = this.songDuration * progressBarPercent;
      const progressBarTimeFormatted =
        this.formatToMinSecPipe.transform(progressBarTime);
      const tooltipElement = document.querySelector(
        '.tooltiptextProgressBar'
      ) as HTMLElement;
      const isBelowSlider = event.clientY > progressBarWrapperRect.bottom;
      if (tooltipElement) {
        tooltipElement.innerText = progressBarTimeFormatted;
        //set position of tooltip if time is valid
        if (progressBarTime > 0 && progressBarTime < this.songDuration) {
          tooltipElement.style.left = `${
            event.clientX -
            parseInt(
              this.getStyle(
                document.querySelector('.container-fluid') as HTMLElement,
                'padding-left'
              )
            )
          }px`;
          tooltipElement.style.top = `${isBelowSlider ? 2.8 : 4.5}rem`;
        } else {
          tooltipElement.style.left = '-300px';
        }
      }
    }
  };
  // hide hover time value in progress bar
  pregressBarMouseLeaveHandler = (event: MouseEvent) => {
    const tootltipElement = document.querySelector(
      '.tooltiptextProgressBar'
    ) as HTMLElement;
    if (tootltipElement) {
      tootltipElement.innerText = '';
      tootltipElement.style.left = '-300px';
    }
  };

  getStyle(element: HTMLElement, style: string) {
    return window.getComputedStyle(element, null).getPropertyValue(style);
  }
}
