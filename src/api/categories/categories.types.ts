export enum CategoryColorsEnum {
  RED = 0,
  BLUE = 1,
  GREEN = 2,
  YELLOW = 3,
  PURPLE = 4,
  ORANGE = 5,
  PINK = 6,
  CYAN = 7,
  TEAL = 8,
  LIME = 9,
  AMBER = 10,
}

export interface CreateCategoryPayload {
  name: string
  description?: string
  color?: CategoryColorsEnum
}

export interface ResponseCategory extends CreateCategoryPayload {
  id: string
}
