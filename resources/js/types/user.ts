export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    edad: number | null;
    sexo: 'M' | 'F' | null;
    telefono: string | null;
    profile_icon: string | null;
    tipo_nacionalidad: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: 'administrador' | 'cliente' | 'recepcionista';
}

export interface UserFormData {
    name: string;
    username: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    edad: string;
    sexo: string;
    telefono: string;
    tipo_nacionalidad: string;
    role: string;
}
