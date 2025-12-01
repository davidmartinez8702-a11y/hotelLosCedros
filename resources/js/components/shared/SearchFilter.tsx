import React from 'react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export interface FilterOption {
    value: string;
    label: string;
}

interface SearchFilterProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    filterValue: string;
    onFilterChange: (value: string) => void;
    filterOptions: FilterOption[];
    searchPlaceholder?: string;
    filterPlaceholder?: string;
}

export function SearchFilter({
    searchValue,
    onSearchChange,
    filterValue,
    onFilterChange,
    filterOptions,
    searchPlaceholder = 'Buscar...',
    filterPlaceholder = 'Filtrar por...',
}: SearchFilterProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9"
                />
            </div>
            <Select value={filterValue} onValueChange={onFilterChange}>
                <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder={filterPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                    {filterOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
