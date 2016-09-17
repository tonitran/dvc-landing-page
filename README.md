# dvc-landing-page
This is the front end to the dvc-embedded program running on the Pi. The site runs on Apache and allows users many functions that can be executed by non-technical folks.

How to Contribute
---
- Follow the [Git branching process](http://nvie.com/posts/a-successful-git-branching-model/).
Always make feature branches off of `develop`. Submit a pull request against develop when ready.
- Test thoroughly on develop before merging into `master`. Master is the production branch and should **always be stable**.
- Deploy on your own Raspberry Pi running local first. If all is well, push to master and then update said code on the production device.

Development Setup
---
1. Create a symbolic link to this project directory and place it in /var/www. The command should be something like: `ln -s ~/dvc-landing-page /var/www/dvc-raspberrypi.local.com`.
2. Set up Apache2 and a virtual host that uses the address `dvc-raspberrypi.local.com`.
3. Edit your `/etc/hosts` file to include a loopback address to `dvc-raspberrypi.local.com`.
4. Visit the address in your browser. Use developer mode or tools to debug and test! You may need some browser plugins such as Allow-CORS to enable cross origin requests.

Testing
---
Add unit tests when you can.

Deployment
---
On the Pi and your own test environment, several things must be done.
1. A virtual host must be set up that will host all these files.
2. A proxy must be defined for the host that will map `/device` to the Flask application
running on the other virtual host (namely, dvc-flask-app.com). See below:

```xml
#/etc/apache2/sites-available/${whatever it is}.conf
<VirtualHost *:80>
	...
	ServerName dvc-raspberrypi.local.com
	ServerAlias www.dvc-raspberrypi.local.com
	...
	DocumentRoot /var/www/dvc-raspberrypi.local.com
	...
    # Define some proxies to pass to the Pi
    ProxyPass           /device   http://dvc-flask-app.com
    ProxyPassReverse    /device   http://dvc-flask-app.com

</VirtualHost>

```

Summary Workflow
---
1. Make feature branch off of develop.
2. Push up remote feature branch and make pull request.
3. Review code and push updated changes if needed.
4. Merge into develop (with --no-ff option).
5. After many features have been merged into develop, creating a release branch from it. Give it a version number. v{MAJOR}.{MINOR}.{HOTFIX}.
6. "Bump" the release branch by making any last minute changes in preparation for production. This may include updating the README, updating environment variables to point to production endpoints, etc.
7. Pull in the release branch's changes from both master and develop. Be sure to tag the master branch with the new version. The release branch may now be deleted.
8. On the production device, perform the fast-forward pull on the master branch. Make sure everything works. If not, it may be necessary to make a hotfix branch.

Future Goals
---
- Requesting access button.
- Snapshot of room.
- Anything else? Feel free to suggest some ideas.
