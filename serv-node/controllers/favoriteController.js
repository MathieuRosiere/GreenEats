const { Favorite } = require("../config/db");

exports.add = async (req, res) => {
    try {
        const userId = req.auth.userId;
        console.log(userId);
        const barcode = req.body.barcode;
        console.log(barcode);
        const [favorite, created] = await Favorite.findOrCreate({ where: { user_id: userId, barcode: barcode } });
        if (created) {
            res.status(201).json({ message: "Produit ajouté aux favoris." });
        } else {
            res.json({ message: "Produit déjà enregistré dans les favoris." });
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "Erreur lors de l'ajout du produit." });
    }
};

// exports.delete = async (req, res) => {
//     try {
//     } catch (error) {}
// };

exports.getAll = async (req, res) => {
    try {
        const favorites = await Favorite.findAll({ where: { user_id: req.auth.userId } });
        const data = favorites.map((favorite) => favorite.barcode);
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};
