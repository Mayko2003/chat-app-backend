import fs from 'fs'
import { Router } from 'express'

const router: Router = Router()

const removeExtension = (fileName: string) => {
    return fileName.split('.').shift();
};

fs.readdirSync(__dirname).forEach((fileName: string) => {
    const name = removeExtension(fileName);
    if (name != 'index') {
        const route = require(`./${name}.routes`).default;
        router.use(`/${name}`, route);
    }
});

export default router