# Reader

## Getting Started

To get started, run

```
./make
```

This script downloads 

1. Google Closure
2. JQuery Templates
3. less.js
4. Twitter Bootstrap
5. Node modules specified in package.json 

and puts everything in the right place. Afterwards, you should be able to run
the express server on port 3000 with

```
node app
```

If you want to start from scratch and undo the work of the make script, there's also

```
./clean
```

## TODO

1. Make bookmarks get synced between the server and clients in realtime.
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
