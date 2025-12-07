import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { IceCream, Monitor, Moon, Sun } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function AppearanceToggleDropdown() {
    const { appearance, updateAppearance } = useAppearance();

    const options: { value: Appearance; icon: React.ElementType; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
        { value: 'cream', icon: IceCream, label: 'Crema' },
    ];

    return (
        <Menu as="div" className="relative inline-block text-left">
            {/* Botón del menú */}
            <Menu.Button
                className="flex items-center gap-2 rounded-md bg-neutral-100 p-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
                {appearance === 'light' && <Sun className="h-5 w-5" />}
                {appearance === 'dark' && <Moon className="h-5 w-5" />}
                {appearance === 'system' && <Monitor className="h-5 w-5" />}
                {appearance === 'cream' && <IceCream className="h-5 w-5" />}
                <span className="sr-only">Change Theme</span>
            </Menu.Button>

            {/* Opciones del menú */}
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-neutral-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-neutral-700 dark:bg-neutral-800"
                >
                    {options.map(({ value, icon: Icon, label }) => (
                        <Menu.Item key={value}>
                            {({ active }) => (
                                <button
                                    onClick={() => updateAppearance(value)}
                                    className={cn(
                                        'group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm',
                                        active
                                            ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100'
                                            : 'text-neutral-700 dark:text-neutral-400',
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}