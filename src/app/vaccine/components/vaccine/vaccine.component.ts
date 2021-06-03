import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { Ivaccine } from '../../interfaces/vaccine.interface';
import { VaccineService } from './services/vaccine.service';
@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit, AfterViewInit {

  displayedColumns = [
    'id',
    'name',
    'type',
    'serail',
    'exp',
    'action'
  ];


  //สำหรับข้อมูลหน้าใน table
  dataSource = new MatTableDataSource<Ivaccine>([]);

  //จำนวนข้อมูลที่ต้องการแสดง paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: VaccineService,
    private app: AppService,
    private rt: Router
  ) {
    this.loadVaccine();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //ค้นหาข้อมูล
  applyFilter(input: HTMLInputElement) {
    const filterValue = input.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onUpdate(item: Ivaccine) {
    this.rt.navigate(['/vaccine/update', item.id]);
  }

  //ลบข้อมูล
  onDelete(item: Ivaccine) {
    Swal.fire({
      title: "คุณต้องการลบใช่ หรือ ไม่",
      text: '',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่"
    })
      .then((getCollection) => {
        if (!getCollection.value) return;
        this.app.loading(true);
        this.service.getCollection.doc(item.id).delete();
        this.app.successAlert("ลบสำเร็จ");
        this.loadVaccine();
      })
      .catch(error => this.app.errorAlert(error.message))
      .finally(() => this.app.loading(false));
  }

  //โหลดข้อมูล
  private loadVaccine() {
    this.service.getCollection.get().subscribe((querySnapshot) => {
      this.dataSource.data = [];
      querySnapshot.forEach(doc => {
        this.dataSource.data.push({ ...doc.data(), id: doc.id });
      });
      this.dataSource.data
        .sort((a, b) => b.created - a.created)
        .map((m, index) => m.index = index + 1);
      this.dataSource._updateChangeSubscription();
    });
  }
}