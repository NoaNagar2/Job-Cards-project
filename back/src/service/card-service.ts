import { ICard } from "../@types/cards";
import { Card } from "../database/model/card";

const creatCard = async (data: ICard, userId: string) => {
  const card = new Card(data);

  card.userId = userId;

  return card.save();
};

export { creatCard };
