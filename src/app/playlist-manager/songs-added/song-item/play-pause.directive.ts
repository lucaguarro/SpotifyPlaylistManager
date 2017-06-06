import { Directive, Renderer2, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
    selector: '[playPause]'
})
export class PlayPauseDirective implements OnInit{
    constructor(private elRef: ElementRef, private renderer: Renderer2, private onPlay: Boolean) {
        onPlay = false;
    }
    ngOnInit(){   
    }

    @HostListener('click') click(eventData: Event) {
        if(this.onPlay){
            this.onPlay = false;
            this.renderer.removeClass(this.elRef.nativeElement, "fa-play-circle");
            this.renderer.removeClass(this.elRef.nativeElement, "fa-pause-circle");
        } else {
            this.onPlay = true;
            this.renderer.removeClass(this.elRef.nativeElement, "fa-pause-circle");
            this.renderer.removeClass(this.elRef.nativeElement, "fa-play-circle");           
        }
        console.log("fuck");
    }
}