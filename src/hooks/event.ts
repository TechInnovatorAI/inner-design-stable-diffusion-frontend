import { useEffect, useState } from 'react'
import { KeyCode } from 'src/views/utils/constants'

/**
 * 判断是否按下空格
 * @param keyDownCb 空格键按下回调
 * @param keyUpCb 空格键松开回调
 * @returns 空格键按下状态
 */
export function useSpaceEvent(
  keyDownCb?: (spacePressState: boolean) => void,
  keyUpCb?: (spacePressState: boolean) => void
) {
  const [isPressSpace, setIsPressSpace] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('keyup', onKeyup)

    return () => {
      window.removeEventListener('keydown', onKeydown)
      window.removeEventListener('keyup', onKeyup)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyDownCb, keyUpCb])

  const onKeydown = (e: KeyboardEvent) => {
    if (e.code === KeyCode.SPACE) {
      setIsPressSpace(true)
      keyDownCb?.(true)
    }
  }

  const onKeyup = (e: KeyboardEvent) => {
    if (e.code === KeyCode.SPACE) {
      setIsPressSpace(false)
      keyUpCb?.(false)
    }
  }

  return isPressSpace
}
