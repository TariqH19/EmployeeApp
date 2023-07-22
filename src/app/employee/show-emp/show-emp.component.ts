import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService){}

  EmployeeList: any = [];

  ModalTitle: string | undefined;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  ngOnInit(): void{
    this.refreshDepList();
  }

  addClick() {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName:"space.PNG"
    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

    closeClick() {
      this.ActivateAddEditEmpComp = false;
      this.refreshDepList();
  }

  editClick(item: any) {
    this.emp = item;
    this.ModalTitle = "Edit Employee"
    this.ActivateAddEditEmpComp = true;
  }
  
    deleteClick(item: any) {
      if (confirm("Are you sure?")) {
      this.service.deleteEmployee(item.EmployeeId).subscribe(res => {
        alert(res.toString());
              this.refreshDepList();
    });
}
}

  refreshDepList() {
    this.service.getEmpList().subscribe(data => {
      this.EmployeeList = data;
    })
  }
}
