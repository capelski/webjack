import express from 'express';
import session from 'express-session';
import { existsSync } from 'fs';
import { join } from 'path';
import { exposeWebjackRoutes, setGameParameters } from 'webjack-web-api';

const defaultConfig = {
    SESSION_SECRET: 'to be replaced with environment variables',
};

const getExpressApp = (environmentConfig: any = {}) => {
    const app = express();

    app.get(/^\/$/, (req, res, next) => res.redirect('/webjack'));
    
    const assetsFolder = join(__dirname, '..', 'docs');
    app.use('/webjack', express.static(assetsFolder));
    
    app.use('/webjack', session({
        secret: environmentConfig.SESSION_SECRET || defaultConfig.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }));
    exposeWebjackRoutes(app, '/webjack/api');

    const gameParametersPath = join(__dirname, '..', 'game-parameters.json');
	if (existsSync(gameParametersPath)) {
        const gameParameters = require(gameParametersPath);
        setGameParameters(gameParameters);
    }

	return app;
};

export default getExpressApp;
