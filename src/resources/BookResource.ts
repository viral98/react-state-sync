import { Book } from '../types/books'
import { BaseResource } from './BaseResource'

export class BookResource extends BaseResource<Book> {
  protected getName(): string {
    return 'books'
  }
  protected getPath = () => 'books'
}
