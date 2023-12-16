import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, 
  ContentChild, 
  DoCheck, 
  ElementRef, 
  Input, 
  OnChanges, 
  OnDestroy, 
  OnInit, 
  SimpleChanges, 
  ViewChild, 
  ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation:ViewEncapsulation.Emulated // None, Native
})
export class ServerElementComponent implements OnInit,
OnChanges,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{
  @Input('srvElement') element: {type: string, name: string, content: string};
  @ViewChild('heading',{static: true}) header: ElementRef
  @ContentChild('contentParagraph',{static: true}) paragraph:ElementRef;
  
  
  constructor(){
    console.log(" server element constructor called")
  }
  ngAfterContentChecked() {
    console.log(" server element ngAfterContentChecked called")
  }
  ngAfterContentInit() {
    console.log(" server element ngAfterContentInit called");
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(" server element ngOnChanges called")
    console.log(changes)
  }

  ngDoCheck(){
    console.log(" server element ngDoCheck called")
  }

  ngAfterViewChecked(){
    console.log(" server element ngAfterViewChecked called")
    
  }


  ngAfterViewInit(){
    console.log(" server element ngAfterViewInit called")
    console.log('Text content: ' + this.header.nativeElement.textContent)
    
  }

  ngOnDestroy(){
    console.log(" server element ngOnDestroy called") 
  }

  ngOnInit(){  
    console.log(" server element ngOnInit called")  
    console.log('Text content: ' + this.header.nativeElement.textContent)
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }


}
