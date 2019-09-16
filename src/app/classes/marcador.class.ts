/* export class Marcador {
    constructor ( public name: string,
                  public albumName: string,
                  public durationMs: any,
                  public previewUrl: string ){}
}
 */

 export class Marcador {
    public name: string;
    public albumName: string;
    public artistName: string;
    public durationMs: any;
    public previewUrl: string;

    public fav: true;

    constructor ( name: string,
                  albumName: string,
                  artistName: string,
                  durationMs: any,
                  previewUrl: string) {
                      this.name = name;
                      this.albumName = albumName;
                      this.artistName = artistName;
                      this.durationMs = durationMs;
                      this.previewUrl = previewUrl;

    }
 }