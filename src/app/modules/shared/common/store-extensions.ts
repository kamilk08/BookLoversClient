
export interface StoreState<T> {
  entities: { [id: number]: T },
  ids: number[],
}

export function hasEntity<T>(state: StoreState<T>, id: number) {
  if (getSingle(state, id) === undefined) return false;

  return true;
}

export function getSingle<T>(state: StoreState<T>, id: number) {
  if (!state.ids.find(v => v === id))
    return undefined;

  return state.entities[id];
}

export function fetchSingle<T, TKey>(key: ((entity: T) => TKey), state: StoreState<T>, entity: T): StoreState<T> {
  let entityKey = key(entity) as unknown as number;
  let ids = state.ids;
  if (!ids.find(v => v === entityKey))
    state.ids.push(entityKey);

  return { ...state, entities: { ...state.entities, [entityKey]: entity }, ids: ids }
}

export function fetchSingleWith(key: any, state: StoreState<any>, entity: any): StoreState<any> {
  let ids = state.ids;
  if (!ids.find(v => v === key))
    state.ids.push(key);

  return { ...state, entities: { ...state.entities, [key]: entity }, ids: ids }
}

export function fetchMany<T, TKey>(key: ((entity: T) => TKey), state: StoreState<T>, entities: T[]): StoreState<T> {

  if (entities.length == 0)
    return state;

  let adaptedEntities = entities.reduce((pv: { [id: number]: T | undefined }, cv: T) => {
    const entityKey = key(cv) as unknown as number;
    return {
      ...pv,
      [entityKey]: cv
    }
  }, { ...state.entities });
  let entitiesIds: number[] = getEntitiesIds(state, key, entities);

  return { ...state, entities: adaptedEntities, ids: entitiesIds }
}

export function replaceEntity<T>(state: StoreState<T>, key: number, entity: T) {
  return { ...state, entities: { ...state.entities, [key]: entity } }
}

export function removeEntity<T>(state: StoreState<T>, key: number) {
  let ids = state.ids;
  const index = state.ids.indexOf(key);
  ids.splice(index, 1);

  delete state.entities[key];

  return { ...state, ids: ids };
}

function getEntitiesIds<T, TKey>(state: StoreState<T>, key: ((entity: T) => TKey), entities: T[]) {
  let ids = state.ids;
  entities.forEach(entity => {
    const entityKey = key(entity) as unknown as number;
    if (!ids.find(p => p === entityKey))
      ids.push(entityKey);
  });

  return ids;
}
