type Loading = boolean

export interface AppState {
  loading: Loading
}

export interface AppStore extends AppState {
  setLoading: (loading: Loading) => void
  clearStore: () => void
}
