import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { ViewportComponent } from './viewport/viewport.component';
import { UiComponent } from './ui/ui.component';
import { SpawnmenuComponent } from './spawnmenu/spawnmenu.component';
import { SpawnmenuItemComponent } from './spawnmenu/item/item.component';
import { ModalComponent } from './modal/modal.component';
import { UpgradeComponent } from './spawnmenu/item/upgrade/upgrade.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewportComponent,
    UiComponent,
    SpawnmenuComponent,
    SpawnmenuItemComponent,
    ModalComponent,
    UpgradeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
