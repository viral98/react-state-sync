import { Book } from '../types/books'
import { BaseCacheService } from './BaseCacheService'

export class BookCacheServiceResource extends BaseCacheService<Book> {
  protected getName(): string {
    return 'books'
  }
}
