import { Directive, Renderer2, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
    selector: '[playPause]'
})
export class PlayPauseDirective implements OnInit{
    onPlay : boolean = false;
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit(){   
    }

    @HostListener('click') click(eventData: Event) {
        if(!this.onPlay){
            this.onPlay = true;
            this.renderer.removeClass(this.elRef.nativeElement, "fa-play-circle");
            this.renderer.addClass(this.elRef.nativeElement, "fa-pause-circle");
        } else {
            this.onPlay = false;
            this.renderer.removeClass(this.elRef.nativeElement, "fa-pause-circle");
            this.renderer.addClass(this.elRef.nativeElement, "fa-play-circle");           
        }
    }
}