export interface Pagination<T> {
    current_page: number;
    data: T[];
    first_page_url: string | null;
    last_page_url: string | null;
    prev_page_url: string | null;
    next_page_url: string | null;
    last_page: number;
    links: { url: string; label: string; active: boolean }[];
    per_page: number;
    total: number;

    from: number | null; 
    to: number | null;
}