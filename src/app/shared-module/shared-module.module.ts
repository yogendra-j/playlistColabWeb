import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipComponent } from './components/tooltip/tooltip.component';

@NgModule({
  declarations: [MinuteSecondsPipe, TooltipComponent],
  imports: [CommonModule, FormsModule, MatTooltipModule],
  exports: [MinuteSecondsPipe, FormsModule, MatTooltipModule, TooltipComponent],
})
export class SharedModuleModule {}
