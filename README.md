# dvc-landing-page
This is the front end to the dvc-embedded program running on the Pi. The site runs on Apache and allows users many functions that can be executed by non-technical folks.

How to Contribute
---
Follow the [Git branching process](http://nvie.com/posts/a-successful-git-branching-model/).
Always make feature branches off of `develop`. Submit a pull request against develop when ready.

Test thoroughly on develop before merging into `master`. Master is the production branch and should **always be stable**.

Deploy on your own Raspberry Pi running local first. If all is well, push to master and then update said repositories on the production device.

Developing and Testing.
---
1. Create a symbolic link to this project directory and place it in /var/www. The command should be something like: `ln -s ~/dvc-landing-page /var/www/dvc-raspberrypi.local.com`.
2. Set up Apache2 and a virtual host that uses the address `dvc-raspberrypi.local.com`.
3. Edit your `/etc/hosts` file to include a loopback address to `dvc-raspberrypi.local.com`.
4. Visit the address in your browser. Use developer mode or tools to debug and test! You may need some browser plugins such as Allow-CORS to enable cross origin requests.

Future Goals
---
- Client processing and graphical display of data.
- Requesting access button.
- Snapshot of room.
- Anything else? Feel free to suggest some ideas.
