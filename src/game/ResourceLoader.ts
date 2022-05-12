import * as PIXI from "pixi.js";

const loader = PIXI.Loader.shared;

// throughout the process multiple signals can be dispatched.
loader.onProgress.add(() => {}); // called once per loaded/errored file
loader.onError.add(() => {}); // called once per errored file
loader.onLoad.add((a,b) =>
{
  if(b.texture)
  {
    TEXTURES[b.name] = b.texture;
    QUEUED_RESOURCES[b.name]?.forEach(v=>v?.(b.texture));
    delete QUEUED_RESOURCES[b.name];
  }
  RESOURCES[b.name] = b;


}); // called once per loaded file
loader.onComplete.add(() => {}); // called once when the queued resources all load.

let QUEUED_RESOURCES : Record<string,((v:PIXI.Texture)=>void)[]> = {}; // All resources the
let RESOURCES = {};
let TEXTURES : Record<string,PIXI.Texture> = {}; // Loaded textures

export class ResourceLoader
{
  static async init()
  {
    return this.do_load();
  }

  /**
   * For when you know for a fact that the texture has been loaded.
   * Synchronous.
   * @param url
   * @returns
   */
  static get_texture(url:string) : PIXI.Texture
  {
    return TEXTURES[url] as PIXI.Texture;
  }

  /**
   * For when you are not sure whether the texture has been added, or has been loaded.
   * Async.
   * @param url
   * @returns
   */
  static async load_texture(url:string) : Promise<PIXI.Texture>
  {
    return new Promise((resolve)=>{
      if(!(url in TEXTURES))
        return this.try_load(url,resolve);
      else
        return resolve(TEXTURES[url]);
    });
  }

  /**
   * Load the texture if the loader is not otherwise busy. Otherwise queue it.
   * @param url
   * @param resolve
   */
  static async try_load(url:string,resolve:(v:PIXI.Texture)=>void)
  {
    this.add_texture(url,resolve);
    if(!loader.loading)
    {
      this.do_load();
    }
  }

  static depth = 0;
  static async do_load() : Promise<void>
  {
    this.depth++;
    if(this.depth > 20)
    {
      throw new Error("Too many loads in a row"); // TODO : Remove once the Bug is resolved
    }
    return new Promise<void>((resolve)=>{

      // Add everything to the actual loader
      for(let k in QUEUED_RESOURCES)
      {
        loader.add(k);
      }

      // Do actual load
      loader.load(()=>
      {
        // Resolve, because all files that were queued back when this function started are now loaded.
        resolve();
        // If new urls were queried while the loader was busy, process them immediately
        let next_urls = Object.keys(QUEUED_RESOURCES);
        if(next_urls.length > 0)
        {
          this.do_load();
        }
      });
  });
  }

  static add_texture(url:string,callback?:(v:PIXI.Texture)=>any)
  {

    if(!(url in QUEUED_RESOURCES))
      QUEUED_RESOURCES[url] = [];
    QUEUED_RESOURCES[url].push(callback);

  }
}
