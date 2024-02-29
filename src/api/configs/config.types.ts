export interface Config {
  id: string
  key: string
  value: string
}

export interface Configs {
  configs: Config[]
}

export interface UpdateConfigsPayload {
  configs: Config[]
}
