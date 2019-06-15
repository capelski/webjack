import getExpressApp from './get-express-app';

const app = getExpressApp();
app.listen(3000, () => {
	console.log('Express server listening on port 3000');
});