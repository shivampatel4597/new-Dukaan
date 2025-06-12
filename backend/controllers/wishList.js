import Wishlist from "../models/wishList_model.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { title } = req.body;

    const alreadyExists = await Wishlist.findOne({ user: userId, title });
    if (alreadyExists) {
      return res.status(400).json({ message: 'Already in wishlist' });
    }

    const newItem = await Wishlist.create({
      user: userId,
      title,
    });

    res.status(201).json({ message: 'Added to wishlist', item: newItem });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
