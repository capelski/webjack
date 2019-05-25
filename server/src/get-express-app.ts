import express, { Request, Response, NextFunction, RequestHandler }  from 'express';
import session from 'express-session';
import { existsSync } from 'fs';
import { join } from 'path';
import { exposeWebjackRoutes, setGameParameters, useDevelopmentCardSet } from 'webjack-web-api';

const defaultConfig = {
    SESSION_SECRET: 'to be replaced with environment variables',
};

const corsMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
};

const getExpressApp = (environmentConfig: any = {}) => {
    const app = express();
    
    const assetsFolder = join(__dirname, 'public');
    app.use(express.static(assetsFolder));
    
    app.use(session({
        secret: environmentConfig.SESSION_SECRET || defaultConfig.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }) as RequestHandler);
    app.use(corsMiddleware);
    exposeWebjackRoutes(app, '/api');

    const gameParametersPath = join(__dirname, '..', 'game-parameters.json');
	if (existsSync(gameParametersPath)) {
        const gameParameters = require(gameParametersPath);
        setGameParameters(gameParameters);
    }
    
    const developmentCardSetPath = join(__dirname, '..', 'development-card-set.json');
	if (existsSync(developmentCardSetPath)) {
        const developmentCardSet = require(developmentCardSetPath);
        if (developmentCardSet.enabled) {
            useDevelopmentCardSet(developmentCardSet.cards);
        }
	}

	return app;
};

export default getExpressApp;

module.exports = getExpressApp;