/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		
		let url: string = new URL(request.url);
    	let key: string = url.pathname.slice(url.pathname.lastIndexOf('/') + 1);
    	
    	console.log(url);
    	console.log(key);
		
		// Extracting values for userEmail, Country from Cf request object
		let userEmail = request.headers.get('Cf-Access-Authenticated-User-Email');
		
		let userCountry = request.headers.get('cf-ipcountry');
		let lower_country: string = userCountry.toLowerCase();
		let r2ObjectName: string = lower_country + '.png';
		let imageFromTunnel: string = 'https://stunnel.kumocloud.online/secure/' + userCountry
		let r2ObjectLocation: string = 'https://r2.kumocloud.online/' + r2ObjectName;
		
		let currentDateTime: Date = new Date();
		
		let htmlResponseTemplate: string = `
		<!DOCTYPE html>
		<html lang="en">
		  <head>
		    <meta charset="utf-8" />
		    <meta http-equiv="x-ua-compatible" content="ie=edge" />
		    <meta name="viewport" content="width=device-width, initial-scale=1" />
		
		    <title>Yay !! Authenticated !!</title>
		  </head>
		
		  <body>
		    <h1>Hello 👋🏻</h1>
		    <p>${userEmail} authenticated at ${currentDateTime} from <a href=${imageFromTunnel} style="color: ForestGreen; text-decoration: underline;">${userCountry}</a></p>
		  </body>
		</html>`
											
		
		
		return new Response(htmlResponseTemplate, {
			headers: {
				'content-type': 'text/html'
			},
		});
	},
};
