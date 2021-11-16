import { BookcaseApi } from './bookcase.api';
import { BookcaseAdapter } from './bookcase.adapter';
import { ShelfAdatper } from './shelf.adapter';


export const api: any[] = [BookcaseApi];
export const adapters: any[] = [BookcaseAdapter, ShelfAdatper];

export * from './bookcase.api';
export * from './bookcase.adapter';
export * from './shelf.adapter';
