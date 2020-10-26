type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
  // NOTE probably also `currentTarget`
  // currentTarget: T;
}
