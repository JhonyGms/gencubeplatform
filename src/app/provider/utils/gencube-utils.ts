import { Injectable,Inject } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class gencubeUtils {

    constructor(
        public BreakpointObserver: BreakpointObserver,
        @Inject(DOCUMENT) document
    ){}

    public itsMovil() {
        return this.BreakpointObserver.isMatched('(max-width: 599px)');;
    }
}