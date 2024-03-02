import { Router } from "express";
import { Card } from "../database/model/card";
import { creatCard } from "../service/card-service";
import { ICard } from "../@types/cards";
import { isBusiness } from "../middleware/is-business";
import { validateCard } from "../middleware/validation";
import { isCard } from "../middleware/is-card";
import { extractToken, isAdmin } from "../middleware/is-admin";
import { User } from "../database/model/user";
import { auth } from "../service/auth-servise";
import { IUser } from "../@types/user";
import { isCardOrAdmin } from "../middleware/is-card-or-admin";

const router = Router();

// get all cards
router.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.find();
    return res.json(allCards);
  } catch (e) {
    next(e);
  }
});

// create card
router.post("/:id", validateCard, async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user.cardId) {
      const savedCard = await creatCard(req.body as ICard, userId);
      user.cardId = savedCard.id;
      user.save();
      res.json({ card: savedCard });
    } else {
      res.json(`כבר יש לך כרטיס, לא ניתן ליצור כרטיס נוסף`);
    }
  } catch (e) {
    next(e);
  }
});

// get my cards
router.get("/mycard/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    const cardId = user.cardId;

    const myCard = await Card.findById(cardId);

    return res.json(myCard);
  } catch (e) {
    next(e);
  }
});

// get card by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);

    return res.json(card);
  } catch (e) {
    next(e);
  }
});

// edit card
router.put("/:id", isCard, validateCard, async (req, res, next) => {
  try {
    const savedUser = await Card.updateOne({ _id: req.params.id }, req.body);
    res.json(savedUser);
  } catch (e) {
    next(e);
  }
});

// delete card
router.delete("/:id", isCardOrAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = await User.findOne({ email: email });
    user.cardId = "";
    user.save();

    const deleted = await Card.findByIdAndDelete({ _id: id });

    return res.json({ deleted });
  } catch (e) {
    next(e);
  }
});

export { router as cardsRouter };
