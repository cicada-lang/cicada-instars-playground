export type Json =
  | string
  | number
  | boolean
  | null
  | Array<Json>
  | { [key: string]: Json }

export type NonNullJson =
  | string
  | number
  | boolean
  | Array<Json>
  | { [key: string]: Json }
