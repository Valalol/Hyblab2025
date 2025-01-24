import { CommonModule, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { Choice, Situation } from '../models/content-data';
import { TextAnimationPipe } from '../text-animation.pipe';
import anime from 'animejs';

@Component({
    selector: 'app-situation',
    standalone: true,
    imports: [
    CommonModule,
    TextAnimationPipe
],
    templateUrl: './situation.component.html',
    styleUrl: './situation.component.scss'
})
export class SituationComponent implements OnChanges, AfterViewInit {
    @Input({ required: true }) situation!: Situation;
    selected_choice?: Choice;

    constructor(private scroller: ViewportScroller) {}

    ngOnChanges(): void {
        this.selected_choice = undefined;
    }

    ngAfterViewInit(): void {
        this.caracterAnimation();
    }
    caracterAnimation(){
        const targetText = document.querySelectorAll("#animatedText p span");
        const targetChoice = document.querySelectorAll("#choice_div") ;

        const textsToAnimate = Array.from(targetText).filter((el) =>
            (el as HTMLElement).getAttribute("data-text-visible") !== "true"
        );
        const choicesToAnimate = Array.from(targetChoice).filter((el) =>
            (el as HTMLElement).getAttribute("data-text-visible") !== "true"
        );

        let tl = anime.timeline({
            loop: false
        });
        tl.add({
            targets: textsToAnimate,
            opacity: [0,1],
            duration: 250,
            easing: "easeOutExpo",
            delay: anime.stagger(20),
            complete: (anim) => {
                textsToAnimate.forEach((el) => (el as HTMLElement).setAttribute("data-text-visible", "true"));
            },
        });
        tl.add({
            targets: choicesToAnimate,
            opacity: [0,1],
            easing: "easeOutExpo",
            complete: (anim) => {
                choicesToAnimate.forEach((el) => (el as HTMLElement).setAttribute("data-text-visible", "true"));
            },
        });
    }
}
