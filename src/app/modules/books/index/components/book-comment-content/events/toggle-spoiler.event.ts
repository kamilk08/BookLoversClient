import { Review } from 'src/app/modules/api/reviews/models/review.model';

export interface ToggleSpoiler {
    review: Review
    spoiler: boolean
}
