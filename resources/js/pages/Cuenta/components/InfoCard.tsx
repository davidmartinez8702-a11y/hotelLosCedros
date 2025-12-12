import React from 'react';

interface InfoCardProps {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
}

export function InfoCard({ title, icon: Icon, children }: InfoCardProps) {
    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{title}</h3>
            </div>
            {children}
        </div>
    );
}
