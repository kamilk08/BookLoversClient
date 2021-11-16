import { FavouritesApi } from "./favourites/favourites.api";
import { ProfileAdapter } from "./profile.adapter";
import { ProfileApi } from "./profile.api";

export const api: any[] = [FavouritesApi, ProfileApi];
export const adapters: any[] = [ProfileAdapter]
