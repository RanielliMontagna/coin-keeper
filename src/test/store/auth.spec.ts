import { useAuthStore } from 'store/auth/auth'

describe('@store/auth', () => {
  it('should be able to get the state', () => {
    const state = useAuthStore.getState()
    expect(state).toBeDefined()
  })

  it('should be able to login', () => {
    useAuthStore.getState().login()
    const state = useAuthStore.getState()
    expect(state.user).toBeDefined()
  })

  it('should be able to logout', async () => {
    await useAuthStore.getState().logout()
    const state = useAuthStore.getState()

    expect(state.user).toBeNull()
  })

  it('should be able to set the token', () => {
    useAuthStore.getState().setToken('token')
    const state = useAuthStore.getState()
    expect(state.token).toBe('token')
  })

  it('should be able to set the user', () => {
    useAuthStore.getState().setUser({
      displayName: 'displayName',
      email: 'email',
      photoURL: 'photoURL',
      uid: 'uid',
    })
    const state = useAuthStore.getState()
    expect(state.user).toBeDefined()
  })

  it('should be able to clear the store', () => {
    useAuthStore.getState().clearStore()
    const state = useAuthStore.getState()

    expect(state.token).toBeNull()
    expect(state.user).toBeNull()
  })
})
