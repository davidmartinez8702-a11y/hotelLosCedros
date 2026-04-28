'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export function ChatN8n() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll al último mensaje
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Agregar mensaje del usuario
        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Obtener CSRF token
            const csrfToken = document.head
                .querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
                ?.content;

            const response = await fetch(route('api.chat.send'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ message: userMessage.text }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar mensaje');
            }

            // Agregar respuesta del bot
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Error de conexión');
            // Agregar mensaje de error al chat
            const errorMessage: Message = {
                id: (Date.now() + 2).toString(),
                text: 'Error al conectar con el asistente. Por favor intenta de nuevo.',
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Modal del chat */}
            {isOpen && (
                <div className="fixed bottom-6 right-4 md:right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200 dark:bg-slate-900 dark:border-slate-700">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <h3 className="font-semibold">Asistente N8N</h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-blue-700 p-1 rounded transition-colors"
                            title="Cerrar chat"
                            aria-label="Cerrar chat"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Mensajes */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-slate-800">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                                <p className="text-center text-sm">
                                    Hola 👋 Pregúntame sobre reportes, disponibilidad, análisis y más...
                                </p>
                            </div>
                        ) : (
                            messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                            msg.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-gray-100 rounded-bl-none'
                                        }`}
                                    >
                                        <p className="break-words">{msg.text}</p>
                                        <span className="text-xs opacity-70 mt-1 block">
                                            {msg.timestamp.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 dark:bg-slate-700 px-3 py-2 rounded-lg">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t bg-white dark:bg-slate-900 rounded-b-lg">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Escribe tu pregunta..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={loading}
                                className="flex-1 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                            />
                            <Button
                                type="submit"
                                size="sm"
                                disabled={loading || !input.trim()}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                title="Enviar mensaje"
                            >
                                <Send className="w-4 h-4" />
                                <span className="sr-only">Enviar mensaje</span>
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Trigger - Retorna solo el estado isOpen para que se maneje desde el padre */}
            {/* Exportamos isOpen como prop para que el sidebar lo controle */}
            {typeof window !== 'undefined' && setIsOpen && !isOpen && (
                <ChatTrigger onClick={() => setIsOpen(true)} />
            )}
        </>
    );
}

// Componente separado para el trigger/botón
export function ChatTrigger({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
            title="Abrir chat con asistente N8N"
            aria-label="Abrir chat"
        >
            <MessageCircleIcon className="w-4 h-4" />
            <span>Chat N8N</span>
        </button>
    );
}

// Icono personalizado para el chat
function MessageCircleIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    );
}
