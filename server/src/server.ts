/// <reference types="vite/client" />
import * as trpcExpress from '@trpc/server/adapters/express'
import express, { RequestHandler } from "express";
import httpDevServer from "vavite/http-dev-server";
import viteDevServer from "vavite/vite-dev-server";

const app = express();

function lazy(
	importer: () => Promise<{ default: RequestHandler }>,
): RequestHandler {
	return async (req, res, next) => {
		try {
			const routeHandler = (await importer()).default;
			routeHandler(req, res, next);
		} catch (err) {
			if (err instanceof Error) viteDevServer?.ssrFixStacktrace(err);
			next(err);
		}
	};
}

app.use((req, _res, next) => {
  // request logger
  console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

  next();
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get('/', (_req, res) => res.send('hellooo!'));


if (httpDevServer) {
	httpDevServer.on("request", app);
} else {
	console.log("Starting prod server");
	app.listen(3334);
}