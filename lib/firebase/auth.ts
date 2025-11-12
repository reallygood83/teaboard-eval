import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { auth } from './config'

// Google Provider
const googleProvider = new GoogleAuthProvider()

// Google 로그인
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch (error: any) {
    console.error('Google 로그인 오류:', error)
    throw error
  }
}

// 로그아웃
export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
  } catch (error: any) {
    console.error('로그아웃 오류:', error)
    throw error
  }
}

// 인증 상태 감지
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

// 현재 사용자 가져오기
export const getCurrentUser = () => {
  return auth.currentUser
}
