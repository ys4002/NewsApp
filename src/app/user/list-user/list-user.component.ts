import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../model/user.model";
import { News } from "../../model/news.model";
import { ApiService } from "../../service/api.service";
import { errorLogin } from 'src/app/shared/helper';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];

  allItems: News[];

  public newsForm: FormGroup;

  items: FormArray;

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {

    //logout if token not present
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    //fetchAllNews from db for report creation
    this.apiService.fetchAllNews()
      .subscribe(data => {
        this.allItems = data.result;
        this.router.navigate(['list-user']);
      },
        error => errorLogin(this.router));

    //dynamically add and remove rows in table to give Agency, Category and Rss feed url
    this.newsForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      agency: '',
      category: '',
      url: ''
    });
  }

  get getItem() {
    return this.newsForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items = this.newsForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  logout(): void {
    window.localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  checkIndex(i: number) {
    if (i === 0) {
      return true;
    }
    return false;
  }

  removeRow(i: number) {
    this.items = this.newsForm.get('items') as FormArray;
    this.items.removeAt(i);
  }

  /**
   * Update the Agency, Category, AgencyFeed, News table
   */
  onSubmit() {

    this.apiService.createFeed(this.newsForm.get('items').value)
      .subscribe(data => {
        this.router.navigate(['list-user']);
      },
        error => errorLogin(this.router));

        location.reload();
  }

  /**
   * truncate the News table
   */
  deleteAllNews() {
    this.apiService.deleteFeed()
      .subscribe(data => {
        alert('All News Deleted');
        this.router.navigate(['list-user']);
      },
        error => errorLogin(this.router));

  }

  /**
   * Download report with fields News title, click count and Category
   */
  report() {
    const doc = new jsPDF();
    var col = ["Title", "Count", "Category"];
    var rows = [];

    debugger;
    this.allItems.forEach(element => {
      var temp = [element.newsTitle, element.clickCount, element.categoryRef.categoryTitle];
      rows.push(temp);
    });
    doc.autoTable(col, rows, { startY: 10 });
    doc.save('report.pdf');
  }

}
