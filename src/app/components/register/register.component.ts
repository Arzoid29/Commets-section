import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  addUser = async(e: any): Promise<void> => {
    e.preventDefault();
    const person = e.target;
    const res = await fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: person[0].value,
        email: person[2].value,
        password: person[3].value,
        lastName:  person[1].value
      }),

    });
    const data = await res.json();
    console.log(data);
    e.target.reset();
  }

  constructor() { }

  async ngOnInit(): Promise<void> {
    // const res = await fetch('http://localhost:3000/api/v1/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     name: 'John Doe',
    //     email: 'john@gmail.com',
    //     password: 'QWERTY1234',
    //     lastName: 'Doe'
    //   }),

    // });
    // const data = await res.json();
    // console.log(data);

  }

}
