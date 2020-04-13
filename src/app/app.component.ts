import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test';
  
  constructor() {
	  let test_required_css = require('./app.component.css');
	  console.log('test_required_css');
	  console.log(test_required_css);
  }
}
