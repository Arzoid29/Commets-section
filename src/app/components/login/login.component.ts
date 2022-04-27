import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login = async (e: any): Promise<void> => {
    e.preventDefault();
    const person = e.target;
    const res = await fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: person[0].value,
        password: person[1].value,
      }),
    });
    const data = await res.json();
    if (data.status === 200) {
      Swal.fire({
        title: 'Success',
        text: 'You have successfully registered',
        icon: 'success',
 });

  window.location.href = 'http://localhost:4200/list-empleados';
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      });
    }
    e.target.reset();
  };
  constructor() {}

  ngOnInit(): void {}
}
