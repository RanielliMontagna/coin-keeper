export enum CategoryColorsEnum {
  RED = 0,
  PINK = 1,
  PURPLE = 2,
  DEEP_PURPLE = 3,
  INDIGO = 4,
  BLUE = 5,
  LIGHT_BLUE = 6,
  CYAN = 7,
  TEAL = 8,
  GREEN = 9,
  LIGHT_GREEN = 10,
  LIME = 11,
  YELLOW = 12,
  AMBER = 13,
  ORANGE = 14,
  DEEP_ORANGE = 15,
  BROWN = 16,
  GREY = 17,
  BLUE_GREY = 18,
  BLACK = 19,
}

export interface CreateCategoryPayload {
  name: string
  description?: string
  color?: CategoryColorsEnum
}

export interface ResponseCategory extends CreateCategoryPayload {
  id: string
}
