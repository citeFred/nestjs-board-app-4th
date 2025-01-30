import { User } from "src/user/user.entity";
import { ArticleStatus } from "../article-status.enum";
import { Article } from "../article.entity";

export class ArticleResponseDto {
    id: number;
    author: string;
    title: string;
    contents: string;
    status: ArticleStatus;
    user: User;

    constructor(article: Article) {
        this.id = article.id;
        this.author = article.author;
        this.title = article.title;
        this.contents = article.contents;
        this.status = article.status;
        this.user = article.user;
    }
}