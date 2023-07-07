export enum CategoryColorsEnum {
  RED = 'RED',
  PINK = 'PINK',
  PURPLE = 'PURPLE',
  DEEP_PURPLE = 'DEEP_PURPLE',
  INDIGO = 'INDIGO',
  BLUE = 'BLUE',
  LIGHT_BLUE = 'LIGHT_BLUE',
  CYAN = 'CYAN',
  TEAL = 'TEAL',
  GREEN = 'GREEN',
  LIGHT_GREEN = 'LIGHT_GREEN',
  LIME = 'LIME',
  YELLOW = 'YELLOW',
  AMBER = 'AMBER',
  ORANGE = 'ORANGE',
  DEEP_ORANGE = 'DEEP_ORANGE',
  BROWN = 'BROWN',
  GREY = 'GREY',
  BLUE_GREY = 'BLUE_GREY',
  BLACK = 'BLACK',
}

export interface CreateCategoryPayload {
  name: string
  description?: string
  color?: CategoryColorsEnum
}

export interface ResponseCategory extends CreateCategoryPayload {
  id: string
}
