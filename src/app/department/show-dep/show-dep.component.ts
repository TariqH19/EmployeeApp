import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {
  constructor(private service: SharedService) {}

  DepartmentList: any = [];
  ModalTitle: string | undefined;
  ActivateAddEditDepComp: boolean = false;
  dep: any;

  DepartmentIdFilter: string = "";
  DepartmentNameFilter: string = "";
  DepartmentListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick() {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ""
    };
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepComp = true;
  }

  closeClick() {
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  editClick(item: any) {
    this.dep = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item: any) {
    if (confirm("Are you sure?")) {
      this.service.deleteDepartment(item.DepartmentId).subscribe(res => {
        alert(res.toString());
        this.refreshDepList();
      });
    }
  }

  refreshDepList() {
    this.service.getDeptList().subscribe(data => {
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data; // Update the unfiltered list
    });
  }

  FilterFn() {
    const DepartmentIdFilter = this.DepartmentIdFilter.toLowerCase().trim();
    const DepartmentNameFilter = this.DepartmentNameFilter.toLowerCase().trim();

    this.DepartmentList = this.DepartmentListWithoutFilter.filter((el: any) => {
      return (
        el.DepartmentId.toString().toLowerCase().includes(DepartmentIdFilter) &&
        el.DepartmentName.toString().toLowerCase().includes(DepartmentNameFilter)
      );
    });
  }

sortResult(prop: string, asc: boolean) {
  this.DepartmentList = this.DepartmentListWithoutFilter.sort((a: any, b: any) => {
    if (asc) {
      return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
    } else {
      return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
    }
  });
}

}
