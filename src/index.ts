import {app} from './app.js'
import { runDB } from './repositories/db.js';
const port = 3000;

const startApp = async() => {
    
    await runDB();
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    }
)}

startApp();