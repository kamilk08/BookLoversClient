import { UUID } from 'angular2-uuid';
import { Quote } from '../../api/quotes/models/quote.model';

export interface QuoteLikeEvent {
    quote: Quote
    isLiked: boolean
}
