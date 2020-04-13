
import { Injectable } from '@angular/core';
import { Renderer2 } from "@angular/core";
import { RendererFactory2 } from "@angular/core";


/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable()
export class AssetsManager {
    
    renderer: Renderer2;
    
    constructor(private rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    
    setTheme(name: string) {
        if(!name) this.removeStyle('theme');
        else {
            this.setStyle('theme', name);
        }
    }
    
    /**
     * Set the stylesheet link with the specified key.
     */
    private setStyle( key: string, themeName: string ) {
        const css: string = this.requireFromApp(`alter_css/${themeName}.component.scss`);
        this.getStyleElementForKey( key ).innerHTML = css;
    }

    /**
     * Remove the style element with the specified key.
     */
    private removeStyle( key: string ) {
        const existingStyleElement = this.getExistingStyleElementByKey( key );
        if ( existingStyleElement ) {
            const head = this.renderer.selectRootElement(`head`);
            this.renderer.removeChild(head, existingStyleElement);
        }
    }

    requireFromSrc( relPath: string ) {
        //return null;
        return require( '../../' + relPath ).default; //PROBLEM
    }

    requireFromApp( relPath: string ) {
        //return null;
        return require( '../' + relPath ).default; //PROBLEM
    }
    

    
    getStyleElementForKey( key: string ): HTMLElement {
        return this.getExistingStyleElementByKey( key ) as HTMLElement || this.createStyleElementWithKey( key );
    }

    getExistingStyleElementByKey( key: string ) {
        try{
            return this.renderer.selectRootElement(`head style.${this.getClassNameForKey( key )}`);
        }
        catch(er) {
            return null;
        }
    }

    createStyleElementWithKey( key: string ) {
        const styleEl = this.renderer.createElement('style');
        this.renderer.addClass(styleEl, this.getClassNameForKey( key ));
        const head = this.renderer.selectRootElement(`head`);
        this.renderer.appendChild( head, styleEl );
        return styleEl;
    }


    getClassNameForKey( key: string ) {
        return `style-manager-${key}`;
    }
    
}


