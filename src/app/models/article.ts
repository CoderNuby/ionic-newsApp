import { SourceModel } from "./source"

export interface ArticleModel {
    source: SourceModel
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}