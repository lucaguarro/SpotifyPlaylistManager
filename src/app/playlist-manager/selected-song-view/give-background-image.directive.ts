import { Directive, Renderer2, ElementRef} from '@angular/core';

@Directive({
  selector: '[appGiveBackgroundImage]'
})
export class GiveBackgroundImageDirective {

  imageUrl: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
    this.renderer.setStyle(this.elRef.nativeElement, 'background-image', "url(\"" + this.imageUrl + ")\"");
  }

}
