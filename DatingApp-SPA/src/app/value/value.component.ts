import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
})
export class ValueComponent implements OnInit {
  values: any;
  // With this http client we can make http request
  constructor(private http: HttpClient) {}

  // When Component Intializes
  ngOnInit() {
    this.getValue();
  }

  getValue() {
    this.http.get('http://localhost:5000/api/values').subscribe(
      (response) => {
        this.values = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
