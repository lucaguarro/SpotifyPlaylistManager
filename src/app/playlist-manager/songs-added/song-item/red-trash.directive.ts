import { Directive, Renderer2, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
    selector: '[makeRed]'
})
export class RedTrashDirective implements OnInit{
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit(){   
    }

    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.renderer.setStyle(this.elRef.nativeElement, 'color', 'red');
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.renderer.setStyle(this.elRef.nativeElement, 'color', '#BDBDBD');
    }
}