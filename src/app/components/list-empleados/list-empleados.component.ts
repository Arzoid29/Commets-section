import { Component, OnInit } from '@angular/core';
import { ListEmployees } from 'src/app/models/listEmployees.inteface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
employee: ListEmployees[] = [];
  constructor( private router:Router) { }

  async getEmployees(): Promise<void> {
    const res = await fetch('http://localhost:3000/api/v1/getEmployees');
    const { employees  } = await res.json();
   this.employee= employees;


  }
  updateEmployee(employee: any): void {
    const { id } = employee;
    this.router.navigateByUrl(`/editEmpleados/${id}`);

    

  }


  async deleteEmployee(employee: any): Promise<void> {
    const res = await fetch(`http://localhost:3000/api/v1/deleteEmployees/${employee}`, {
      method: 'DELETE',

    });
    const data = await res.json();
    this.getEmployees();
    if ( data.status === 201) {
      Swal.fire({
        title: 'Success',
        text: 'You have successfully deleted',
        icon: 'success'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error'
      });
    }
  }

  async getEmployeeById(employee: any): Promise<void> {
    const res = await fetch(`http://localhost:3000/api/v1/updateEmployees/${employee?.id}`);

  }

  async ngOnInit(): Promise<void> {
    this.getEmployees();
  }


}
