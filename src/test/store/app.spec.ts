import { useAppStore } from 'store/app/app'

describe('@store/app', () => {
  it('should be able to get the state', () => {
    const state = useAppStore.getState()
    expect(state).toBeDefined()
  })

  it('should be able to set the state loading', () => {
    useAppStore.setState({ loading: true })
    const state = useAppStore.getState()
    expect(state.loading).toBe(true)
  })

  it('should be able to set the state theme', () => {
    useAppStore.setState({ theme: 'light' })
    const state = useAppStore.getState()
    expect(state.theme).toBe('light')
  })

  it('should be to clear the state', () => {
    useAppStore.setState({ loading: true, theme: 'light' })
    useAppStore.getState().clearStore()
    const state = useAppStore.getState()
    expect(state.loading).toBe(false)
    expect(state.theme).toBe('dark')
  })

  it('should be able to set the state loading with the setter', () => {
    useAppStore.getState().setLoading(true)
    const state = useAppStore.getState()
    expect(state.loading).toBe(true)
  })

  it('should be able to set the state theme with the setter', () => {
    useAppStore.getState().setTheme('light')
    const state = useAppStore.getState()
    expect(state.theme).toBe('light')
  })
})
