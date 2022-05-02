import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {
  addEmployee = async(e: any): Promise<void> => {
    e.preventDefault();

    const employee = e.target;
    const res = await fetch('http://localhost:3000/api/v1/addEmployees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: employee[0].value,
        documentId: employee[2].value,
        salary: employee[3].value,
        lastName:  employee[1].value
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

  ngOnInit(): void {
  }

}
