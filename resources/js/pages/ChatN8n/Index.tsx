import AppLayout from '@/layouts/app-layout';
import { type ReactNode, useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export default function ChatN8nPage() {
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

            // Configurar timeout de 150 segundos (2.5 minutos) para n8n
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 150000);

            const response = await fetch(route('api.chat.send'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'Accept': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({ message: userMessage.text }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || `Error ${response.status}: No autorizado`);
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
            let errorMessage = 'Error de conexión';
            
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    errorMessage = 'Tiempo de espera agotado. N8N está demorando más de lo esperado.';
                } else {
                    errorMessage = error.message;
                }
            }
            
            toast.error(errorMessage);
            // Agregar mensaje de error al chat
            const botErrorMessage: Message = {
                id: (Date.now() + 2).toString(),
                text: errorMessage,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botErrorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-2xl py-6">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 flex flex-col h-[600px]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <h1 className="text-2xl font-bold">Asistente N8N</h1>
                    </div>
                    <p className="text-sm text-blue-100">En línea</p>
                </div>

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-slate-800">
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full flex-col gap-4">
                            <div className="text-5xl">👋</div>
                            <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
                                Hola, soy tu asistente inteligente
                            </p>
                            <p className="text-center text-gray-500 dark:text-gray-500 max-w-md">
                                Pregúntame sobre reportes, disponibilidad de habitaciones, análisis de reservas y mucho más...
                            </p>
                        </div>
                    ) : (
                        messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-md px-4 py-3 rounded-lg ${
                                        msg.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-gray-100 rounded-bl-none'
                                    }`}
                                >
                                    <p className="break-words">{msg.text}</p>
                                    <span className="text-xs opacity-70 mt-2 block">
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
                            <div className="bg-gray-200 dark:bg-slate-700 px-4 py-3 rounded-lg">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-6 border-t bg-white dark:bg-slate-900 rounded-b-lg">
                    <div className="flex gap-3">
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
                            disabled={loading || !input.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                            title="Enviar mensaje"
                        >
                            <Send className="w-4 h-4" />
                            <span className="sr-only">Enviar mensaje</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

ChatN8nPage.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={[
        { title: 'Dashboard', href: '/' },
        { title: 'Chat N8N', href: '#' }
    ]}>
        {page}
    </AppLayout>
);
