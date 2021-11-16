
export const noNullOrUndefined = () => {
  return (obj: any) => obj === undefined ? false : true
}

export const minLength = (length: number) => {
  return (phrase: string) => phrase.length < length ? false : true;
}

export const noEmptyStrings = () => {
  return (phrase: string) => phrase.length === 0 ? false : true
}

export const removeWhiteSpaces = () => {
  return (phrase: string) => phrase === undefined ? phrase : phrase.trim();
}

export const noEmptyArray = () => {
  return (arr: Array<any>) => arr.length < 0 ? false : true;
}
