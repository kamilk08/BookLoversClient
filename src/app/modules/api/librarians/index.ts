import { LibrariansAdapter } from "./api/librarians.adapter";
import { LibrariansApi } from "./api/librarians.api";
import { ManageLibrarianApi } from "./api/manage-librarian.api";
import { PromotionWaiterAdadpter } from "./api/promotion-waiter.adapter";

export const api: any[] = [LibrariansApi, ManageLibrarianApi];
export const adapters: any[] = [LibrariansAdapter, PromotionWaiterAdadpter]
