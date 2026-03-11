
export interface WorkItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  type?: string;
  tools?: string;
  year?: string;
  link?: string;
}

export type SectionId = 'home' | 'profile' | 'works' | 'contact';
