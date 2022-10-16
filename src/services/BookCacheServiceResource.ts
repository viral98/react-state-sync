import { Book } from '../types/books'
import { BaseCacheService } from './BaseCacheService'

export class BookCacheServiceResource extends BaseCacheService<Book> {
  protected getPath(): string {
    return 'books'
  }
}
