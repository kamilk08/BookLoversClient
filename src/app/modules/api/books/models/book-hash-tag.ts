export interface BookHashTag {
    hashTagValue: string
}

export const MAX_HASHTAG_LENGTH = (input?: number) => input ? input : 60; 