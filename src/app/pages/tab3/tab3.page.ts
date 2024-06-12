import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/models/article';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get articles(): ArticleModel[] {
    return this.storageService.getArticles;
  }
  
  constructor(private storageService: StorageService) {
  }
}
