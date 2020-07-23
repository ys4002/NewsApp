import { Category } from './category.model';

export class News {

  id: number;
  newsTitle: string;
  newsDesc: string;
  newsDate: Date;
  newsLink: string;
  clickCount: number;
  categoryRef: Category;

}
