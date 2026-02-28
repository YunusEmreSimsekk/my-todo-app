import React, { useState } from 'react';
import TaskItem from '../components/TaskItem';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    const addTask = () => {
        if (!input.trim()) return;
        setTasks([...tasks, { id: Date.now(), title: input, completed: false }]);
        setInput("");
    };
    const updateTask = (id, newTitle) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle } : t));
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-12 flex flex-col items-center font-sans">
            <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl shadow-blue-100 border border-white">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                        📌 Görev <span className="text-blue-600 font-black">Merkezi</span>
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm font-medium">İşlerini düzenle, verimini artır.</p>
                </div>

                <div className="flex gap-3 mb-10">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-slate-50 border-2 border-transparent p-4 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all duration-300 shadow-inner"
                        placeholder="Yeni bir görev planla..."
                    />
                    <button
                        onClick={addTask}
                        className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200 transition-all duration-200"
                    >
                        Ekle
                    </button>
                </div>

                <div className="space-y-4">
                    {tasks.length === 0 ? (
                        <div className="text-center py-10 grayscale opacity-50">
                            <span className="text-4xl">☕</span>
                            <p className="text-slate-400 mt-2">Bugünlük her şey tamam!</p>
                        </div>
                    ) : (
                        tasks.map(t => (
                            <TaskItem
                                key={t.id}
                                task={t}
                                onDelete={(id) => setTasks(tasks.filter(x => x.id !== id))}
                                onToggle={(id) => setTasks(tasks.map(x => x.id === id ? { ...x, completed: !x.completed } : x))}
                                onUpdate={updateTask}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}