import { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { PostItNote } from './PostItNote'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

interface Note {
  id: string
  text: string
  position: { x: number; y: number }
}

export const PostItNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])

  const createNote = useCallback((text = '') => {
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
      text,
      position: { x, y }
    }

    setNotes(prev => [...prev, newNote])
    return newNote
  }, [notes])

  // Auto-create an empty note if there are none
  useEffect(() => {
    if (notes.length === 0) {
      createNote()
    }
  }, [notes.length, createNote])

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
    setNotes(prev => {
      const newNotes = prev.filter(note => note.id !== id)
      // If this was the last note, a new empty one will be created by the useEffect
      return newNotes
    })
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
    </Container>
  )
}