import { useState, useRef, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'

const peelAnimation = keyframes`
  0% {
    transform: rotateX(0deg) rotateY(0deg) translateZ(0px);
    transform-origin: top left;
  }
  50% {
    transform: rotateX(-15deg) rotateY(15deg) translateZ(20px);
    transform-origin: top left;
  }
  100% {
    transform: rotateX(-30deg) rotateY(30deg) translateZ(40px) translateY(-20px);
    opacity: 0;
    transform-origin: top left;
  }
`

const PostItContainer = styled.div<{ 
  $x: number
  $y: number
  $isCompleting: boolean
  $isCompleted: boolean
}>`
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #ffeb3b 0%, #fdd835 100%);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  cursor: ${({ $isCompleting }) => $isCompleting ? 'default' : 'move'};
  user-select: none;
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 0.1s ease-out;
  
  ${({ $isCompleting }) => $isCompleting && css`
    animation: ${peelAnimation} 0.8s ease-out forwards;
    pointer-events: none;
  `}
  
  ${({ $isCompleted }) => $isCompleted && css`
    display: none;
  `}

  &:hover {
    transform: ${({ $isCompleting }) => $isCompleting ? 'none' : 'translateY(-2px)'};
    box-shadow: ${({ $isCompleting }) => $isCompleting ? 
      '0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' : 
      '0 6px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
`

const TextArea = styled.textarea<{ $isEditing: boolean }>`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  padding: 20px;
  font-family: 'VT323', monospace;
  font-size: 1.2rem;
  line-height: 1.4;
  color: #333;
  cursor: ${({ $isEditing }) => $isEditing ? 'text' : 'move'};
  pointer-events: ${({ $isEditing }) => $isEditing ? 'auto' : 'none'};

  &::placeholder {
    color: rgba(51, 51, 51, 0.5);
  }
`

const CompleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: rgba(76, 175, 80, 0.8);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${PostItContainer}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(76, 175, 80, 1);
    transform: scale(1.1);
  }

  &::before {
    content: '✓';
  }
`

interface PostItNoteProps {
  id: string
  text: string
  position: { x: number; y: number }
  onUpdate: (id: string, text: string) => void
  onPositionChange: (id: string, position: { x: number; y: number }) => void
  onComplete: (id: string) => void
}

export const PostItNote = ({
  id,
  text,
  position,
  onUpdate,
  onPositionChange,
  onComplete
}: PostItNoteProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isCompleting, setIsCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    if (!isCompleting) {
      setIsEditing(true)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(id, e.target.value)
  }

  const handleTextBlur = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      setIsEditing(false)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing || isCompleting) return
    
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || isCompleting) return

    const newX = Math.max(0, e.clientX - dragOffset.x)
    const newY = Math.max(0, e.clientY - dragOffset.y)
    
    onPositionChange(id, { x: newX, y: newY })
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      // Snap to grid
      const gridSize = 220
      const snappedX = Math.round(position.x / gridSize) * gridSize
      const snappedY = Math.round(position.y / gridSize) * gridSize
      onPositionChange(id, { x: snappedX, y: snappedY })
    }
  }

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCompleting(true)
    
    // Wait for animation to complete before removing
    setTimeout(() => {
      setIsCompleted(true)
      onComplete(id)
    }, 800)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset, position])

  return (
    <PostItContainer
      $x={position.x}
      $y={position.y}
      $isCompleting={isCompleting}
      $isCompleted={isCompleted}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <CompleteButton onClick={handleComplete} />
      <TextArea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        onBlur={handleTextBlur}
        onKeyDown={handleKeyDown}
        $isEditing={isEditing}
        placeholder="Type your note..."
      />
    </PostItContainer>
  )
}