import { ArticleModel } from "./article";

export interface ArticlesByCategoryModel {
    [key: string] : {
        page: number,
        articles: ArticleModel[],
        isAllPageLoaded: boolean
    }
}