import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Role } from '@app/models/role';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})


export class ManageUsersComponent implements OnInit {
  users: User[];
  // material tabel code
  displayedColumns: string[] = ['id', 'name', 'age', 'email', 'role', 'actions'];
  dataSource;
  selection;
  userId: number;
  deleteAllState: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(x => {
      this.userId = x.id
    });
  }

  ngOnInit(): void {
    this.authService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    //selection
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<string>(allowMultiSelect, initialSelection);
  }
  //delete user function
  deleteUser(id: number) {
    this.authService.getById(id).subscribe(data => {
      console.log(data);
      if (data.role != "admin") {
        this.authService.deleteUser(id).subscribe(
          data => {
            alert("this user deleted")
          },
          error => {
            alert("you can't delete this user")
          })
      } else {
        alert("you can't delete, this user is Admin")

      }

    })

  }

   DeleteAll() {
    let selectedArray = this.selection.selected;
    for (let selectedUser of selectedArray) {
      if (selectedUser.role != "admin") {
        this.selection.clear() ;
        this.deleteAllState = false;
         this.authService.deleteUser(selectedUser.id).subscribe(data => {
        }
          )
      }
    }
  }
   makeAdmin(id: number) {
    this.authService.getById(id).subscribe(data => {
      if (data.role != "admin") {
        if (data.id = id) {
          data.role = Role.Admin;
          this.authService.updateUser(id, data).subscribe(data => {
            alert("user updated")
          },
            error => {
              alert("you can't update this user")
            })
        }

      } else {
        alert("you can't update, this user is Admin")

      }
    })



  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    console.log(this.selection.selected);
    if (numSelected > 1) {
      this.deleteAllState = true;
      return numSelected == numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(element => this.selection.select(element));
    this.deleteAllState = false;
  }

}
