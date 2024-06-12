import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ArticleModel } from 'src/app/models/article';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  articles: ArticleModel[] = [];
  isAllPagesLoaded: boolean = false;

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.newsService.getNewsHeadLines().subscribe(res => {
      this.articles = res.articles;
      this.isAllPagesLoaded = res.isAllPageLoaded;
    });
  }

  onIonInfinite(event: Event){
    if(this.isAllPagesLoaded) {
      (event as InfiniteScrollCustomEvent).target.disabled = true;
      return;
    }else{
      (event as InfiniteScrollCustomEvent).target.disabled = false;
    }
    this.newsService.getNewsHeadLines(true).subscribe(res => {
      if(res.status === "error") {
        this.isAllPagesLoaded = true;
        (event as InfiniteScrollCustomEvent).target.complete();
        return;
      }
      this.articles = res.articles;
      (event as InfiniteScrollCustomEvent).target.complete();
    });
  }

}
