import multer from "multer";

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({ // configure le chemin et le nom de fichier pour les fichiers entrants
    destination: (req, file, callback) => { // destination pour enregistrer les images
      callback(null, 'images');
    },
    // récupère le nom d'origine, add _ à la place des " "  puis renvoie le nom complet avec le underscore et l'extension 
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
    }
});

export default multer({ storage }).single('image'); // single pour indiquer que c'est un fichier unique.