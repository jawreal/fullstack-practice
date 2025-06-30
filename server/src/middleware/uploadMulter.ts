import multer, { Multer} from 'multer';
import path from 'path';
import { fileURLToPath } from 'url'; // use this in ES module, otherwise just path

// in ES module, __dirname is not available by sefault
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const uploadPath: string = path.join(__dirname, '../upload');

// Initialize multer
const uploadMulter: Multer = multer({ dest: uploadPath });

export default uploadMulter;
