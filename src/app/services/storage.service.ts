import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ArticleModel } from '../models/article';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: ArticleModel[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadArticlesFromStore();
  }

  async saveOrRemoveArticle(article: ArticleModel) {
    const existingArticleIndex = this._localArticles.findIndex(localArticle => localArticle.title === article.title);

    if (existingArticleIndex === -1) {
      this._localArticles = [article, ...this._localArticles];
    } else {
      this._localArticles.splice(existingArticleIndex, 1);
    }

    await this._storage?.set('articles', this._localArticles);
  }

  get getArticles(): ArticleModel[] {
    return this._localArticles;
  }

  async loadArticlesFromStore() {
    let articles: ArticleModel[] = await this._storage?.get('articles') || [];
    articles.forEach(article => {
      this._localArticles.push(article);
    });
  }

  isInFavoritesArticle(article: ArticleModel){
    return !!this._localArticles.find(localArticle => localArticle.title === article.title);
  }
}
