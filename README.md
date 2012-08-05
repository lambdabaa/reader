# Reader

## Getting Started

To get started, run

```
./m
```

This script downloads the Google Closure, Twitter Bootstrap, and the node
modules specified in package.json and puts everything in the right place.
Afterwards, you should be able to run the express server on port 3000 with

```
node app
```

## TODO

1. Make articles get synced between the server and clients in realtime.
2. Build out the crawler to keep up realtime mirrors of the links and comments on
  * Delicious (?)
  * Digg (?)
  * Hacker News
  * Reddit
3. Make a lightweight model wrapper for the mongodb that abstracts the details
of specific social bookmarking sites to provide an api to:
  * GET bookmarks
  * POST bookmarks
  * GET bookmarks/comments
  * POST bookmarks/comments
4. Deploy to EC2.
5. Integrate optimizely and get people to test it.
