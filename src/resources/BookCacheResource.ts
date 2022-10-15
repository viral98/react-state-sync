import { Book } from '../types/books'
import { BaseCacheResource } from './BaseCacheResource'

export class BookCacheResource extends BaseCacheResource<Book> {
  protected getName(): string {
    return 'books'
  }
}
