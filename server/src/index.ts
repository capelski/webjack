import getExpressApp from './get-express-app';

const app = getExpressApp();
app.listen(8000, (error: any) => {
	if (error) {
		console.error(error);
	}
	else {
		console.log('Express server listening on port 8000');
	}
});