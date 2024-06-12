import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { ActionSheetController, Platform } from '@ionic/angular';
import { ArticleModel } from 'src/app/models/article';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: ArticleModel | null = null;
  @Input() index: number = 0;

  constructor(
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    private storageService: StorageService
  ) { }

  async openArticle(){
    if(this.platform.is("ios" || this.platform.is("android"))){
      await Browser.open({ url: this.article!.url });
      return;
    }

    window.open(this.article?.url, "_blank");
  }

  async onOpenMenu(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: this.getOpenMenuButtons()
    });

    await actionSheet.present();
  }

  private async onShareArticle() {
    await Share.share({
      title: this.article?.title,
      text: this.article?.content,
      url: this.article?.url
    });
  }

  private onToggleFavorite() {
    this.storageService.saveOrRemoveArticle(this.article!);
  }

  private getOpenMenuButtons() {
    const articleInFavorite = this.storageService.isInFavoritesArticle(this.article!);
    return [
      { text: "Share", icon: "share-outline", handler: ()=> this.onShareArticle() },
      { 
        text: articleInFavorite ? "Remove Favorite" : "Favorite",
        icon: articleInFavorite ? "heart-dislike-outline" : "heart-outline",
        handler: ()=> this.onToggleFavorite()
      },
      { text: "Cancelar", icon: "close-outline", role: "cancel" }
    ];
  }
}
