import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Category } from "../model/category.model";
import { News } from "../model/news.model";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ApiResponse } from '../model/api.response';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  category: Category[];
  selected: string[] = [];
  newsData: News[];
  ws: any;
  disabled: boolean;
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {

    // Get all categories from db
    this.apiService.getCategory()
      .subscribe(data => {
        this.category = data.result;
      });

      this.connect();

    // check local storage for selected category data
    if (JSON.parse(localStorage.getItem("categories")) !== null) {
      this.selected = JSON.parse(localStorage.getItem("categories"));
      this.apiService.getNews(this.selected)
        .subscribe(data => {
          this.newsData = data.result;
        });
    }

  }

  login() {
    this.disconnect();
    this.router.navigate(['login']);
  }

  /* This method is called when a checkbox is checked or unchecked
   * Add checked category to array and remove unchecked category from array
   * Get news related to the categories selected
   * Store the updated selected categories in the local storage
  */
  onFilterChange(eve: any) {

    if (eve.currentTarget.checked) {
      this.selected.push(eve.target.value);
    } else {
      let index = this.selected.indexOf(eve.target.value);
      this.selected.splice(index, 1);
    }

    this.apiService.getNews(this.selected)
      .subscribe(data => {
        this.newsData = data.result;
      });

    if (this.selected.length === 0)
      this.newsData = [];

    localStorage.setItem("categories", JSON.stringify(this.selected));
  }

  /* This method is called when a link is clicked
   * It increases the click count of the news and opens
   * the link in a new tab
  */
  click(news, index) {
    debugger;
    this.apiService.updateCount(news.id).subscribe(data => {
      this.newsData[index] = data.result;
    });

    window.open(news.newsLink, "_blank");

  }

  connect() {
    let socket = new SockJS("http://localhost:8080/getData");
    let api: ApiResponse;
    
    this.ws = Stomp.over(socket);
    let that = this;
    this.ws.connect({}, function(frame) {
      that.ws.subscribe("/errors", function(message) {
        alert("Error " + message.body);
      });

      that.ws.subscribe("/topic/reply", function(message) {
        api = JSON.parse(message.body);
        
        that.newsData = api.result;
        
      });
      that.disabled = true;
    }, function(error) {
      console.log("STOMP error " + error);
    });
  }

  disconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    console.log("Disconnected");
  }

}
