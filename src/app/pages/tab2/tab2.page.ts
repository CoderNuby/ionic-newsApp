import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ArticleModel } from 'src/app/models/article';
import { HeadlinesType } from 'src/app/models/headlinesTypes';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categories: HeadlinesType[] = [];

  articles: ArticleModel[] = [];

  currentCategory: HeadlinesType = "business";
  isAllPagesLoaded: boolean = false;

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.categories = [
      'business',
      'entertainment',
      'general',
      'health',
      'science',
      'sports',
      'technology'
    ];

    this.currentCategory = this.categories[0];

    this.newsService.getNewsByCategory(this.currentCategory).subscribe(res => {
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
    this.newsService.getNewsByCategory(this.currentCategory, true).subscribe(res => {
      if(res.status === "error") {
        this.isAllPagesLoaded = true;
        (event as InfiniteScrollCustomEvent).target.complete();
        return;
      }
      this.articles = res.articles;
      (event as InfiniteScrollCustomEvent).target.complete();
    });
  }

  segmentChanged(event: CustomEvent) {
    let category = event.detail.value as HeadlinesType;
    this.currentCategory = category;

    this.newsService.getNewsByCategory(category).subscribe(res => {
      this.articles = res.articles;
      this.isAllPagesLoaded = res.isAllPageLoaded;
    });
  }
}
