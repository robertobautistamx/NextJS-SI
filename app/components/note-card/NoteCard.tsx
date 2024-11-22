// "use client";
// import { useState, useRef, useEffect } from 'react';
// import { NoteData } from '../../types/Note';

// interface NoteCardProps {
//     note: NoteData;
// }

// const NoteCard = ({note }: NoteCardProps) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const cardRef = useRef<HTMLDivElement | null>(null);

//     function toggleExpand() {
//         setIsExpanded(!isExpanded);
//     }

//     function handleEditClick(id: number):void {
//         console.log(`Edit note ${id}`);
//     }

//     useEffect(() => {
//         if (isExpanded && cardRef.current) {
//             cardRef.current.scrollIntoView({
//                 behavior: "smooth",
//                 block: "center",
//             });
//         }
//     }, [isExpanded]);

//     return (
//         <div
//             ref={cardRef}
//             onClick={toggleExpand}
//             key={note.id}
//             className={`p-4 bg-white rounded-lg shadow-md mb-4 min-h-60 space-y-2 cursor-pointer ${isExpanded ? "max-w-full" : "max-w-72"}`}>
//             <div className='flex flex-row items-center space-x-2'>
//                 <div className={` ${note.category == 1 ? "bg-green_category" : note.category == 2 ? "bg-orange_category" : "bg-blue_category"} rounded-full p-[6px] animate-pulse`}></div>
//                 <h2 className="text-xl font-semibold text-gray-800 truncate">{note.title}</h2>
//             </div>
//             <div className='max-h-60 min-h-40 text-ellipsis'>
//                 <p className="text-gray-600 text-wrap line-clamp-[6] text-justify">{note.content}</p>
//             </div>
//             <div className='w-full flex justify-end bottom-0'>
//                 <button
//                     onClick={() => handleEditClick(note.id)}
//                     className='text-white bg-orange-300 hover:bg-orange-400 p-2 rounded'>
//                     <svg className='w-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
//                     </svg>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default NoteCard;

"use client";
import { useState, useRef, useEffect } from "react";
import { NoteData } from "../../types/Note";

interface NoteCardProps {
    note: NoteData;
    onUpdateNote: (updatedNote: NoteData) => void;
}

const NoteCard = ({ note, onUpdateNote }: NoteCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);
    const [editCategory, setEditCategory] = useState(note.category);

    const cardRef = useRef<HTMLDivElement | null>(null);

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }

    function handleEditClick() {
        setIsEditing(true);
    }

    function handleSaveClick() {
        setIsEditing(false);
        onUpdateNote({
            ...note,
            title: editTitle,
            content: editContent,
            category: editCategory,
        });
    }

    useEffect(() => {
        if (isExpanded && cardRef.current) {
            cardRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [isExpanded]);

    return (
        <div
            {...(isEditing ? {} : { onClick: toggleExpand })}
            ref={cardRef}
            className={`p-4 bg-white rounded-lg shadow-md mb-4 min-h-60 space-y-2 ${
                isExpanded ? "max-w-full" : "max-w-72"
            }`}
        >
            <div className="flex flex-row items-center space-x-2">
                <div
                    className={`${
                        note.category === 1
                            ? "bg-green_category"
                            : note.category === 2
                            ? "bg-orange_category"
                            : "bg-blue_category"
                    } rounded-full p-[6px] animate-pulse`}
                ></div>
                {isEditing ? (
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="text-xl font-semibold text-gray-800 truncate w-full p-2 border rounded"
                    />
                ) : (
                    <h2 className="text-xl font-semibold text-gray-800 truncate">{note.title}</h2>
                )}
            </div>
            <div className="max-h-60 min-h-40 text-ellipsis">
                {isEditing ? (
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 border rounded resize-none"
                        rows={4}
                    />
                ) : (
                    <p className="text-gray-600 text-wrap line-clamp-[6] text-justify">{note.content}</p>
                )}
            </div>
            {isExpanded && (
                <div className="w-full flex flex-col space-y-2">
                    {isEditing && (
                        <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(Number(e.target.value))}
                            className="w-full p-2 border rounded"
                        >
                            <option value={1}>Ideas</option>
                            <option value={2}>Por hacer</option>
                            <option value={3}>Terminado</option>
                        </select>
                    )}
                </div>
            )}
            <div className="w-full flex justify-end space-x-2">
                {isEditing ? (
                    <button
                        onClick={handleSaveClick}
                        className="text-white bg-green-500 hover:bg-green-600 p-2 rounded"
                    >
                        Guardar
                    </button>
                ) : (
                    <button
                        onClick={handleEditClick}
                        className="text-white bg-orange-300 hover:bg-orange-400 p-2 rounded"
                    >
                        <svg
                            className="w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default NoteCard;
