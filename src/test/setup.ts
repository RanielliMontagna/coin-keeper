import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// Extende o expect do jest com os matchers do jest-dom
expect.extend(matchers)

// Limpa o ambiente após cada teste para evitar problemas
afterEach(() => {
  cleanup()
})

// Mock do matchMedia do window para evitar problemas com o @mantined/hooks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

//Mock do useNavigate do react-router-dom
const mockedNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}))

//Mock do firebase/auth
vi.mock('firebase/auth', () => ({
  ...vi.importActual('firebase/auth'),
  GoogleAuthProvider: class {
    constructor() {}
    static credentialFromResult = vi.fn(() => ({
      accessToken: 'accessToken',
    }))
  },
  signInWithPopup: vi.fn(() =>
    Promise.resolve({
      user: {
        displayName: 'displayName',
        email: 'email',
        photoURL: 'photoURL',
        uid: 'uid',
      },
    }),
  ),
  signOut: vi.fn(),
  getAuth: vi.fn(),
}))
