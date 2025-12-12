import React from 'react';

interface KPICardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    color: string;
    subtitle?: string;
}

export function KPICard({ title, value, icon: Icon, color, subtitle }: KPICardProps) {
    return (
        <div className={`rounded-xl border p-6 ${color}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium opacity-80">{title}</p>
                    <p className="mt-1 text-2xl font-bold">{value}</p>
                    {subtitle && (
                        <p className="mt-1 text-xs opacity-60">{subtitle}</p>
                    )}
                </div>
                <div className="rounded-full bg-white/50 p-3">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}