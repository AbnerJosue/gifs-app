import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})

export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt:string = '';

  public hasLoaded: boolean = false;
  private timeWaiting: number = 1000;
  
  ngOnInit(): void {
    if( !this.url) throw new Error('Url property is required');
  }

  onLoad(){ 
    
    setTimeout(() => {
      this.hasLoaded = true
    }, this.timeWaiting )
  }
  
}
