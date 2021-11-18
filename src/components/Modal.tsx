import { useEffect, useRef, ReactNode, KeyboardEvent } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const Wrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 11;
  animation: ${fadeIn} 0.2s ease-in-out;
`
const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`
const ModalCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  max-width: 80vw;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  outline: none;
  color: #2e2c2b;
  font-size: 16px;
`

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    if (cardRef.current && isOpen) {
      cardRef.current.focus()
    }
  }, [cardRef, isOpen])

  return (
    <Wrapper isOpen={isOpen}>
      <Backdrop onClick={onClose} />
      <ModalCard tabIndex={0} onKeyDown={handleKeyDown} ref={cardRef}>
        {children}
      </ModalCard>
    </Wrapper>
  )
}
