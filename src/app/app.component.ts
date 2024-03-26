import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('myForm') form: NgForm | any;
  data: any;
  constructor() {}
  ngOnInit(): void {
    this.updateChart();
  }
  firstValue!: number;
  secondValue!: number;
  showError: boolean = false;
  updateValues(event: any) {
    // Ensure total does not exceed 100%
    console.log(event.target.value);
    console.log(event.target.name)
    const targetName = event.target.name;
    const targetValue = parseFloat(event.target.value);
    if (targetName === 'firstValue') {
      if (targetValue < 0 || targetValue > 100) return;
      this.form.form.patchValue({ secondValue: 100 - targetValue });
    } else if (targetName === 'secondValue') {
      if (targetValue < 0 || targetValue > 100) return;
      this.form.form.patchValue({ firstValue: 100 - targetValue });
    }
  }
  // Function to update pie chart data
  updateChart() {
    console.log(this.form);
    this.data = {
      labels: ['First Value', 'Second Value'],
      datasets: [
        {
           data: [this.firstValue, this.secondValue],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        },
      ],
    };
    this.form?.resetForm();
  }
  validateValues() {
    if (this.firstValue  > 100) {
      this.showError = true;
    }else if(this.secondValue >100){
      this.showError = true
    }
     else {
      this.showError = false;
    }
  }
}
