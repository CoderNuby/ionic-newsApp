import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleModel } from 'src/app/models/article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {

  @Input() articles: ArticleModel[] = [];
  @Input() withInfiniteScroll: boolean = true;

  constructor() { }
}