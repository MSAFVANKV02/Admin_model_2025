export type ICategory  = {
    _id?: string;
    category_name: string;
    parent_category:string | null;
    coverImage:string;
    icon: string;
    featured: boolean; 
    published: boolean;
}