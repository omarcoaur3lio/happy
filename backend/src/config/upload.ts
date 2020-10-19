import multer from 'multer';
import path from 'path';

export default {
    // Indica que os arquivos deverão ser gravados em disco
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        // Sempre que um arquivo for armazenado, precisamos renomeá-lo para evitar que arquivos com o mesmo nome sejam sobrescritos
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        },
    })
};