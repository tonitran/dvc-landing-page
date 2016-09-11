# dvc-landing-page
This is the front end to the dvc-embedded program running on the Pi. The site runs on Apache and allows users many functions that can be executed by non-technical folks.

How to Contribute
---
Follow the [Git branching process](http://nvie.com/posts/a-successful-git-branching-model/).
Always make feature branches off of `develop`. Submit a pull request against develop when ready.

Test thoroughly on develop before merging into `master`. Master is the production branch and should **always be stable**.

To test and develop this page:
1. Set up Apache2 and a virtual host, with a mapped /etc/hosts address. (Or just stick to the defaults)
2. Copy all these files to the /var/www/html directory (or the directory of your virtual host).
3. Visit the address in your browser. Typically that will be `localhost`. Use developer mode or tools to debug and test! You may need some browser plugins such as CORS to enable cross origin requesting.

Future Goals
---
- Client processing and graphical display of data.
- Requesting access button.
- Snapshot of room.
- Anything else? Feel free to suggest some ideas.
