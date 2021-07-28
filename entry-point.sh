#!/bin/sh

npm run schema:drop && npm run typeorm migration:run && npm run seed:config && npm run seed:run && npm run seed:progress && npm run dev