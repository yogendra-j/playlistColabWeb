import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [MinuteSecondsPipe],
  imports: [CommonModule, FormsModule, MatTooltipModule],
  exports: [MinuteSecondsPipe, FormsModule, MatTooltipModule],
})
export class SharedModuleModule {}
