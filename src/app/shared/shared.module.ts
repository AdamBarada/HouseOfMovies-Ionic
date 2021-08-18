import { NgModule } from '@angular/core';
import { ShortenPipe } from '../pipes/shorten.pipe';

@NgModule({
  declarations: [ShortenPipe],
  exports: [ShortenPipe],
  imports: []
})

export class SharedModule {}
