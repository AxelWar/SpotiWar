import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { SafeDomPipe } from './pipes/safe-dom-pipe.pipe';
import { NoImagePipe } from './pipes/no-image.pipe';
import { CardComponent } from './card/card.component';
import { HeaderItemComponent } from './header-item/header-item.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoadingComponent,
    SafeDomPipe,
    NoImagePipe,
    CardComponent,
    HeaderItemComponent,
  ],
  imports: [CommonModule],
  exports: [
    NavbarComponent,
    LoadingComponent,
    SafeDomPipe,
    NoImagePipe,
    CardComponent,
    HeaderItemComponent,
  ],
})
export class SharedModule {}
