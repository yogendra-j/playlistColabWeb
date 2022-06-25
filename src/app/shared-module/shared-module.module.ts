import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';

@NgModule({
  declarations: [MinuteSecondsPipe],
  imports: [CommonModule],
  exports: [MinuteSecondsPipe],
})
export class SharedModuleModule {}
