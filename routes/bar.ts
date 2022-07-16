import { RequestHandler } from "express";
import viteDevServer from "vavite/vite-dev-server";
import nav from "./nav";

const barRoute: RequestHandler = async (req, res, next) => {
	let html = "<h1>Hello from page /bar</h1>" + nav;

	if (import.meta.env.DEV) {
		html = await viteDevServer!.transformIndexHtml(req.url, html);
	}

	res.send(html);
};

export default barRoute;
