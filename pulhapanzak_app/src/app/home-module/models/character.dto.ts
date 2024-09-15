export interface CharacterDto {
    id: number;
    name: string, 
    status: string,
    species: string,
    image: string
}

export interface ApiResponse {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string | null;
    };
    results: CharacterDto[];
  }