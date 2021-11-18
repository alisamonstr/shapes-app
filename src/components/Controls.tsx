import { memo, useState } from 'react'
import styled from 'styled-components'

import { Button } from './Button'
import { Modal } from './Modal'

const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  z-index: 1;
`
const Info = styled.div`
  font-family: apple color emoji, segoe ui emoji, noto color emoji,
    android emoji, emojisymbols, emojione mozilla, twemoji mozilla,
    segoe ui symbol;
  margin-left: 10px;
  font-size: 2em;
  cursor: pointer;
`

const InfoText = styled.div<{ paddingBottom?: boolean }>`
  padding-bottom: ${(p) => (p.paddingBottom ? '10px' : 0)};
`
const Title = styled(InfoText)`
  font-weight: 500;
  font-size: 18px;
`
const DescriptionSmall = styled(InfoText)`
  font-size: 12px;
  color: #575655;
`

interface ControlsProps {
  reset: () => void
}

export const Controls = memo(({ reset }: ControlsProps) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  return (
    <Wrapper>
      <Button onClick={reset}>Reset</Button>
      <Info onClick={() => setIsAboutOpen(true)}>ℹ️</Info>
      <Modal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)}>
        <Title paddingBottom>About</Title>
        <InfoText> Welcome to this great app.</InfoText>
        <InfoText paddingBottom>
          This app makes parallelogram and circle with the same area and center.
        </InfoText>
        <InfoText> How to use:</InfoText>
        <InfoText paddingBottom>
          Add 3 points in any place on the screen you want. We will calculate
          the last one and show you the final shape. Also, we will made a circle
          and show you points locations, and area in the center on shapes.
        </InfoText>
        <DescriptionSmall paddingBottom>
          The app made by Alisa Maltseva, 2021.
        </DescriptionSmall>
        <Button onClick={() => setIsAboutOpen(false)}>Close</Button>
      </Modal>
    </Wrapper>
  )
})
