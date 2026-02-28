import React, { useState } from 'react';

export default function TaskItem({ task, onDelete, onToggle, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleUpdate = () => {
        onUpdate(task.id, newTitle);
        setIsEditing(false);
    };
    return (
        <div className={`group flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 ${task.completed ? 'bg-slate-50 border-transparent' : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50'}`}>
            {isEditing ? (
                <div className="flex gap-2 flex-1 animate-in slide-in-from-left-2 duration-300">
                    <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="bg-white border-2 border-blue-400 p-2 rounded-xl w-full outline-none shadow-sm"
                        autoFocus
                    />
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-600 transition">Kaydet</button>
                </div>
            ) : (
                <div className="flex items-center gap-4 flex-1 overflow-hidden">
                    <div
                        onClick={() => onToggle(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${task.completed ? 'bg-blue-500 border-blue-500' : 'border-slate-300 hover:border-blue-500'}`}
                    >
                        {task.completed && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span
                        onClick={() => onToggle(task.id)}
                        className={`cursor-pointer font-semibold truncate transition-all duration-300 ${task.completed ? 'line-through text-slate-400 italic' : 'text-slate-700'}`}
                    >
                        {task.title}
                    </span>
                </div>
            )}

            <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="p-2 text-slate-400 hover:text-orange-500 transition-colors">
                        ✏️
                    </button>
                )}
                <button onClick={() => onDelete(task.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    🗑️
                </button>
            </div>
        </div>
    );
}