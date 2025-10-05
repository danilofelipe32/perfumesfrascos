
export interface Perfume {
  id: number;
  name: string;
  designer: string;
  imageUrl: string;
  year: number;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  story: string;
}
