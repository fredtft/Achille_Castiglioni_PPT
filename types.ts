
export enum SlideType {
  TITLE = 'TITLE',
  QUOTE = 'QUOTE',
  CONTENT_SPLIT = 'CONTENT_SPLIT',
  TIMELINE = 'TIMELINE',
  DETAILS = 'DETAILS',
  FEATURE = 'FEATURE'
}

export interface Slide {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: string;
  quote?: string;
  author?: string;
  images?: string[];
  imagePosition?: 'left' | 'right';
  list?: string[];
  notes?: string;
  metadata?: {
    course?: string;
    university?: string;
    student?: string;
  };
}

export interface PresentationState {
  currentSlideIndex: number;
  isEditMode: boolean;
  showNotes: boolean;
  isFullscreen: boolean;
}
