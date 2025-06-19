export interface FilmOption {
  id: string;
  title: string;
}

export interface StudioOption {
  id: string;
  name: string;
}

export interface OrderPayload {
  id_film: string;
  id_studio: string;
  jadwal: string;
  id_kursi: string[];
  total_kursi: number;
}
