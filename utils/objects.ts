export interface Products {
  id: number;
  title: string;
  price: number;
  category: number;
  description: string;
  image: string;
}

export interface Categorie {
  Id_categorie: number,
  nom_categorie: string
}

export interface Client {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  adress: string;
}