import { useState, useCallback } from 'react'
import styled from 'styled-components'

import { PostItNote } from './PostItNote'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const AddButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
  transition: all 0.2s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(76, 175, 80, 0.6);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '+';
  }
`

interface Note {
  id: string
  text: string
  position: { x: number; y: number }
}

export const PostItNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])

  const addNote = useCallback(() => {
    const gridSize = 220
    const maxCols = Math.floor(window.innerWidth / gridSize)
    const existingPositions = new Set(
      notes.map(note => `${note.position.x},${note.position.y}`)
    )

    // Find the first available grid position
    let x = 0
    let y = 0
    let found = false

    for (let row = 0; row < 10 && !found; row++) {
      for (let col = 0; col < maxCols && !found; col++) {
        const testX = col * gridSize
        const testY = row * gridSize
        if (!existingPositions.has(`${testX},${testY}`)) {
          x = testX
          y = testY
          found = true
        }
      }
    }

    const newNote: Note = {
      id: Date.now().toString(),
      text: '',
      position: { x, y }
    }

    setNotes(prev => [...prev, newNote])
  }, [notes])

  const updateNote = useCallback((id: string, text: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, text } : note
    ))
  }, [])

  const updateNotePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, position } : note
    ))
  }, [])

  const completeNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }, [])

  return (
    <Container>
      {notes.map(note => (
        <PostItNote
          key={note.id}
          id={note.id}
          text={note.text}
          position={note.position}
          onUpdate={updateNote}
          onPositionChange={updateNotePosition}
          onComplete={completeNote}
        />
      ))}
      <AddButton onClick={addNote} />
    </Container>
  )
}