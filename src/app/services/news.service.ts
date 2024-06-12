import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HeadlinesResponseModel } from '../models/headlinesResponse';
import { HeadlinesType } from '../models/headlinesTypes';
import { ArticlesByCategoryModel } from '../models/articlesByCategory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategory: ArticlesByCategoryModel = {}

  apiUrl: string = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    `apiKey=${environment.apiKey}`;

  constructor(
    private http: HttpClient
  ) { }

  getNewsHeadLines(scrollLoadingData: boolean = false): Observable<HeadlinesResponseModel> {
    return this.getNewsByCategory("business", scrollLoadingData);
  }

  getNewsByCategory(category: HeadlinesType, scrollLoadingData: boolean = false) {
    if(Object.keys(this.articlesByCategory).includes(category)){
      let resData: HeadlinesResponseModel = {
        status: "ok",
        totalResults: 0,
        articles: this.articlesByCategory[category].articles,
        isAllPageLoaded: this.articlesByCategory[category].isAllPageLoaded
      }
      if(scrollLoadingData){
        this.articlesByCategory[category].page++;
        return this.http.get<HeadlinesResponseModel>(this.apiUrl, {params: { category, page: this.articlesByCategory[category].page }}).pipe(map(res => {
          this.articlesByCategory[category].articles = [...this.articlesByCategory[category].articles, ...res.articles];
          res.articles = this.articlesByCategory[category].articles;
          return res;
        }), catchError(err => {
          this.articlesByCategory[category].isAllPageLoaded = true;
          this.articlesByCategory[category].page--;
          return of({ status: "error", totalResults: 0, articles: this.articlesByCategory[category].articles, isAllPageLoaded: true })
        }));
      }
      return of(resData);
    }else{
      this.articlesByCategory[category] = {
        page: 1,
        articles: [],
        isAllPageLoaded: false
      }
    }
    return this.http.get<HeadlinesResponseModel>(this.apiUrl, {params: { category, page: this.articlesByCategory[category].page }}).pipe(map(res => {
      this.articlesByCategory[category].articles = [...res.articles];
      return res;
    }));
  }
}
