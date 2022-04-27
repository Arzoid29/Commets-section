import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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
    if ( data.status === 201) {
      Swal.fire({
        title: 'Success',
        text: 'You have successfully registered',
        icon: 'success'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error'
      });
    }e.target.reset();
  }

  constructor() { }

  ngOnInit() {


  }

}
