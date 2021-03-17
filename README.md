# Web Programming II MEAN stack starter template
A repository containing a starter MongoDB, Express.js, Angular, and Node.js (MEAN) project for full-stack web development

### Running the Docker containers
1. Start by installing Docker if you have not already done so: https://docs.docker.com/get-docker/
    * NOTE for Windows users: I *highly* recommend that you enable the Windows Subsystem for Linux Version 2 (WSL2) in Windows, and intall a default Linux 
   distribution (like Ubuntu) prior to 
       installing Docker. Docker will run much easier on all editions of Windows 10 if you perform this step first
        - This article will walk you through enabling WSL2: https://www.omgubuntu.co.uk/how-to-install-wsl2-on-windows-10
          - If your BIOS does not have virtualization enabled, you may encounter an error enabling WSL 2. This article can help you enable virtualization on 
          your computer: https://support.bluestacks.com/hc/en-us/articles/115003174386-How-to-enable-Virtualization-VT-on-Windows-10-for-BlueStacks-4
        - Once you have Docker installed, set Ubuntu 20 to be your default distribution by opening a command prompt as administrator and running the 
          following command:
          - `wsl -s Ubuntu-20.04`
        - Once your default distribution is set, verify Docker is configured correctly to use WSL 2 and your default WSL distro: https://docs.docker.com/docker-for-windows/wsl/
          - Check the "Settings > General" and ""Settings > Resources > WSL Integration" sections of your Docker installation and compare them to the 
            screenshots on this website
1. After installing Docker, start the necessary containers for the project by running the `scripts/start_container` script appropriate for your operating 
   system
   - `scripts/start_container` for macOS and Linux
   - `scripts/start_container.bat` for Windows

### Developing

1. Once the Docker containers have started, attach to the development container by running the `scripts/attach_container` script appropriate for your operating
 system
   - `scripts/attach_container` for macOS and Linux
   - `scripts/attach_container.bat` for Windows
1. Navigate to the `/app/web2` directory. This will be where the source code of the project will be shared into the Docker container
1. Run `yarn install` to install server dependencies.
1. Run `npm run start:server` to start the development server. 
    1. You can access the Express.js API via http://localhost:9000 on your local machine
1. In a new terminal, run another instance of `scripts/attach_container` and run `npm run start:client` to run the development client application inside the 
`/app/web2` directory.
    1. You can access the Angular application via http://localhost:8080 in a browser on your local machine

## Build & development

Run `gulp build` for building and `gulp buildcontrol:heroku` to deploy to Heroku.

## Testing

- Running `npm test:client` will run the client unit tests. 
- Running `npm test:server` will run the server unit tests.
- Running `npm test:e2e` will run the e2e tests using Protractor.

## FAQ
If you see an error from Heroku saying "match is not defined", try running these commands from your dist directory:
1. `heroku config:set NODE_MODULES_CACHE=false`
1. `git commit -am 'disable node_modules cache' --allow-empty`
1. `git push heroku master`
1. `heroku config:set NODE_MODULES_CACHE=true`

If you see a message during `yarn install` saying "info There appears to be trouble with your network connection. Retrying...", followed by the error 
"ESOCKETTIMEDOUT", cancel the yarn install and try it again. If this does not help, try restarting Docker.

## Acknowledgements
This project is based, in part, on the [Yeoman Angular Full-Stack Generator](https://angular-fullstack.github.io/) 

## LICENSE
This software is licensed under the [FreeBSD License](https://opensource.org/licenses/bsd-license.php) 
