type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
  // NOTE maybe also `currentTarget`
  // currentTarget: T
}
