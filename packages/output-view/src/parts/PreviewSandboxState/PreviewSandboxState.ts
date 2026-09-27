const createState = (): { isActive: () => boolean; setActive: (value: boolean) => void } => {
  let active = false
  const isActive = (): boolean => active
  const setActive = (value: boolean): void => {
    active = value
  }
  return { isActive, setActive }
}

export const { isActive, setActive } = createState()
