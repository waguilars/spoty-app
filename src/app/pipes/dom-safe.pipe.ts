import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSafe',
})
export class DomSafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string, url = 'https://open.spotify.com/embed?uri='): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
  }
}
