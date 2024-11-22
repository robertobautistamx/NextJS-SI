import { useState } from 'react';
import { NoteData } from '../../types/Note';
import NoteCard from '../note-card/NoteCard';
import { supabase } from "../../lib/supabase";

interface NoteListProps {
    notes: NoteData[];
}

const NoteList = ({notes}: NoteListProps) => {
    const [localNotes, setLocalNotes] = useState<NoteData[]>(notes);

    const updateNote = async (updatedNote: NoteData) => {
        try {
            const { error } = await supabase
            .from('notes')
            .update({
                title: updatedNote.title,
                content: updatedNote.content,
                category: updatedNote.category,
            })
            .eq('id', updatedNote.id);

            if(error) {
                alert('Error al actualizar la nota: ' + error.message);
                return;
            }

            setLocalNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === updatedNote.id ? updatedNote : note
                )
            );
        } catch (error: unknown) {
            alert('Error al actualizar la nota: ' + (error as Error).message);
        }
    }

    return (
        <div className='flex flex-wrap p-4 gap-4 overflow-auto max-h-screen'>
            {localNotes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onUpdateNote={updateNote}
                />
            ))}
        </div>
    );
};


export default NoteList;