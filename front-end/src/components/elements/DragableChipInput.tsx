import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy, // 1. THIS CRITICAL STRATEGY ENABLES multi-row horizontal sorting
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Chip } from '@mui/material';

// --- Sortable Chip Item Wrapper ---
function SortableChip({ id, label }: { id: string; label: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // Visual cue during drag
    zIndex: isDragging ? 10 : 1,   // Keep active chip on top
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ display: 'inline-flex', cursor: 'grab' }}
    >
      <Chip label={label} color={isDragging ? 'primary' : 'default'} />
    </Box>
  );
}

// --- Main Component ---
export default function MultiLineChipGrid() {
  const [chips, setChips] = useState([
    { id: '1', label: 'Chip One' },
    { id: '2', label: 'Chip Two' },
    { id: '3', label: 'Chip Three' },
    { id: '4', label: 'Chip Four' },
    { id: '5', label: 'Chip Five' },
    { id: '6', label: 'Chip Six' },
    { id: '7', label: 'Chip Seven' },
  ]);

  // Prevent accidental drags when clicking, but allow movement
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setChips((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter} // 2. Looks at center coordinates, not single axes
      onDragEnd={handleDragEnd}
    >
      {/* 3. rectSortingStrategy calculates horizontal sorting on multiple wraps */}
      <SortableContext items={chips} strategy={rectSortingStrategy}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap', // Native CSS flex wrapping
            gap: 1.5,
            width: '100%',
            maxWidth: 400,    // Force multiple rows for testing
            p: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
          }}
        >
          {chips.map((chip) => (
            <SortableChip key={chip.id} id={chip.id} label={chip.label} />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
}
