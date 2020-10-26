type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
  // NOTE probably you might want to add the currentTarget as well
  // currentTarget: T;
}
