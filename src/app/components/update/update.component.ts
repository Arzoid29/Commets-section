import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute} from '@angular/router';
import { ListEmployees } from 'src/app/models/listEmployees.inteface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  async updateEmployee(e: any): Promise<void> {
    e.preventDefault();
    const employee = e.target;
    const { id } = this.infoToEdit[0];
    const res = await fetch('http://localhost:3000/api/v1/editEmployees/'+ id, {
      method: 'PUT',
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
        text: 'You have successfully edited the employee',
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

  infoToEdit: ListEmployees[] =[];


  constructor(private router:Router, private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRouter.params.subscribe(async (params) => {
      const res =  await fetch(`http://localhost:3000/api/v1/getEmployees/${params['id']}`);
      const data = await res.json();

      this.infoToEdit.push(data.employees);


    });
}
}
