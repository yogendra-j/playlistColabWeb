import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MinuteSecondsPipe, TooltipComponent, HeaderComponent],
  imports: [CommonModule, FormsModule, MatTooltipModule, MatToolbarModule, MatIconModule, RouterModule],
  exports: [MinuteSecondsPipe, FormsModule, MatTooltipModule, TooltipComponent, HeaderComponent],
})
export class SharedModuleModule {}
