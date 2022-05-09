import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { ResourceLoader } from './game/ResourceLoader';
import { Game } from './game/Game';

if (environment.production) {
  enableProdMode();
}

ResourceLoader.init().then(()=>
{
  let game = new Game();
  window["game"] = game;
  platformBrowserDynamic([{provide:'game',useValue:game}]).bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
