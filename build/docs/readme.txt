=== INSTALL

1. Go to project build dir
cd <project_dir>/build

2. Install gulp and modules
npm install -g gulp
npm install

=== BUILDING

1. Go to project build dir
cd <project_dir>/build

2. Run build command
	- Site dev
		npm run build-site-dev
	-Site prod
		npm run build-site-prod
	- All apps dev
		npm run build-dev
	- All apps prod
		npm run build-prod

=== CONFIGURE DEV TOOLS

1. Configure your server root dir to ./build/dev/site

2. Go to project build dir
cd <project_dir>/build

3. Start watching app files
	- Site
		npm run watch-site
	- All apps
		npm run watch

=== OTHER

1. Building dev versions of all apps and start watching
npm run start