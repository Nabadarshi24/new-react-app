import { useState } from 'react';
import { Box, Chip, Paper, TextField } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

export default function HorizontalChipInputTS() {
  const [chips, setChips] = useState<string[]>(['React', 'TypeScript', 'Material-UI', 'Next.js']);
  const [inputValue, setInputValue] = useState<string>('');

  // Handle addition of new chips
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const cleanValue = inputValue.trim();
      if (!chips.includes(cleanValue)) {
        setChips([...chips, cleanValue]);
      }
      setInputValue('');
    }
  };

  // Handle deletion of chips
  const handleDelete = (chipToDelete: string) => {
    setChips(chips.filter((chip) => chip !== chipToDelete));
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedChips = Array.from(chips);
    const [removed] = reorderedChips.splice(result.source.index, 1);
    reorderedChips.splice(result.destination.index, 0, removed);

    setChips(reorderedChips);
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 600
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          alignItems: 'center'
        }}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId="chips-droppable"
            direction="horizontal"
          // isDropDisabled={true}
          >
            {
              (provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap'
                  }}
                >
                  {chips.map((chip, index) => (
                    <Draggable
                      key={chip}
                      draggableId={chip}
                      index={index}
                    // isDragDisabled={true}
                    >
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            display: 'inline-block',
                            opacity: snapshot.isDragging ? 0.6 : 1,
                          }}
                        >
                          <Chip
                            label={chip}
                            onDelete={() => handleDelete(chip)}
                            // Stops click/delete events from firing drag logic
                            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
                            sx={{ cursor: 'grab' }}
                          />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )
            }
          </Droppable>
        </DragDropContext>

        <TextField
          variant="standard"
          placeholder={chips.length === 0 ? "Type and press Enter..." : ""}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{ disableUnderline: true }}
          sx={{ flexGrow: 1, minWidth: 120, ml: 1 }}
        />
      </Paper>
    </Box>
  );
}
