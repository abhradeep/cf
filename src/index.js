/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		
		const url = new URL(request.url);
    	const country = url.pathname.slice(url.pathname.lastIndexOf('/') + 1);
    	const country_key = country + '.png';
    	
    	switch (request.method) {
    		case 'GET':
    			const obj = await env.MY_FLAG_ASSET.get(country_key);
    			
    			if (obj === null) {
    				return new Response('file not found', {status: 404});
    			}
    			
    			const headers = new Headers();
    			obj.writeHttpMetadata(headers);
    			headers.set('etag', obj.httpEtag);
    			
    			console.log("%o", obj.body);
    			//console.log(JSON.stringify(obj.body));
    			
    			return new Response(obj.body, {headers,});
    			
    		default:
    			return new Response('Nethod Now Allowed at the moment', {
    				status: 405,
    				headers: {
    					Allow: 'GET',
    				},
    			});
    	}
	},
};
