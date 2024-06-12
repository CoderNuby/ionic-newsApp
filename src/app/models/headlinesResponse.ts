import { ArticleModel } from "./article"


export interface HeadlinesResponseModel {
    status: string
    totalResults: number
    articles: ArticleModel[],
    isAllPageLoaded: boolean
}