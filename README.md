<p align="center">
    <img src="resources/node_logo.png" height="256">
</p>

<p align="center">
    <h1 align="center">Node.JS Server Template Code</h1>
</p>

## Table of Contents
- [What is this repository?](#what-is-this-repository)
- [What does this `README` cover?](#what-does-this-readme-cover)
- [Project Methodology](#project-methodology)
- [Installing and running this project locally](#installing-and-running-this-project-locally)
  - [Starting a Server](#starting-a-server)
- [Repository Structure](#repository-structure)
  - [Project root directory files](#project-root-directory-files)
  - [Project Folders](#project-folders)
    - [`views/`](#views)
    - [`tests/`](#tests)
    - [`scripts/`](#scripts)
    - [`routes/`](#routes)
    - [`resources/`](#resources)
    - [`public/`](#public)
    - [`Jenkins/`](#jenkins)
    - [`bin/`](#bin)
    - [`.vscode/`](#vscode)
- [Included Node.js Scripts, Commands and Tooling](#included-nodejs-scripts-commands-and-tooling)
  - [Important Scripts/Commands](#important-scriptscommands)
  - [Important Tooling](#important-tooling)
    - [Node Package Manager](#node-package-manager)
    - [Nodemon](#nodemon)
    - [ESLint](#eslint)
    - [JSDoc](#jsdoc)
    - [Mocha](#mocha)
    - [Handlebars](#handlebars)
    - [Helmet](#helmet)
    - [Debug](#debug)
- [General Code Contribution Best Practices](#general-code-contribution-best-practices)
  - [<a name="contribute">Debugging, testing, and contributing.</a>](#a-namecontributedebugging-testing-and-contributinga)
  - [<a name="contribute-overview">Overview</a>](#a-namecontribute-overviewoverviewa)
    - [Git/GitHub Best Practices Summary:](#gitgithub-best-practices-summary)
  - [<a name="debugging">Debugging</a>](#a-namedebuggingdebugginga)
  - [<a name="testing">Testing</a>](#a-nametestingtestinga)

## What is this repository?
This is the Node.js server template repository for you/your team to use as you/your team sees fit, and works best for small-scale projects. The server template is built with a mix of handwritten code and a suite of open-source tools and libraries. The core language of this project is JavaScript (running [Node.js](https://nodejs.org)), which is actively developed and maintained by several organizations. Feel free to clone this repository and change it as needed.


## What does this `README` cover?
This `readme` (the landing page of this repository) goes over several things:
1. [The methodology behind creating and maintaining this project.](#project-methodology)
2. [Installing and running this project locally.](#installing-and-running-this-project-locally)
3. [The structure of this repository and all its default contents.](#repository-structure)
4. [The included scripts, commands and tooling, how to use the tools, and how to add/remove tools.](#included-nodejs-scripts-commands-and-tooling)
5. [General code contribution best practices.](#general-code-contribution-best-practices)


## Project Methodology
This repository was created with the goal to enable developers to easily bootstrap a small (but scalable, with some changes) Node.js server from some existing code (create a Node.js server from an existing Node.js server codebase) so a lot of the tedious work is already done. While existing tools such as `express-generator` exist out in the wild, they do not necessarily encapsulate up-to-date best practices for small-scale projects.


## Installing and running this project locally
**NOTE:** Having access to a bash-based shell that can use Git is important for this project. If you are on Windows, it is suggested to either install the [Linux subsystem for Windows](https://docs.microsoft.com/en-us/windows/wsl/install-win10), which gives you access to a true Linux-based Bash shell, or [Git Bash](https://gitforwindows.org) for a simulated Bash shell on Windows.


To install this project, you must first have the following items installed:

1. [Node.js](https://nodejs.org/en) and the [Node Package Manager (NPM)](https://www.npmjs.com). Please select the `LTS` version, *NOT* the latest version.
   - If you are running Linux, please install via the Linux binary. If this option does not work for you or you prefer/know how to install Node.js with the `tar.gz` bundle, feel free to do so.
2. [Git SCM](https://git-scm.com) (Note: Mac users may have to [install XCode first](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)).

To check if you already have Node.JS or to ensure it's been installed correctly, type `node -v` into your terminal or command line utility and hit `enter`. You should see the following (your Node.js version may differ):

```bash
v10.15.3
```

To check if you already have NPM or to ensure it's been installed correctly, type `npm -v` into your terminal or command line utility and hit `enter`. You should see the following (your version may differ):

```bash
6.4.1
```

To check if you already have Git or to ensure it's been installed correctly, type `git --version`. You should something similar to the following:

```bash
git version 2.17.2 (Apple Git-113)
```

After ensuring the above requirements are met, please clone this repository. Navigate to this directory with your terminal and
type in: `npm install`. This will install all the required packages.

### Starting a Server

To actually see a live demo of this server running, run the following command in your terminal at the root directory of this project: `npm run start`. This will run the server in [**development** mode as opposed to production mode](https://dev.to/flippedcoding/difference-between-development-stage-and-production-d0p). An alias for `npm run start` is `npm run dev`, so you can choose to run either command (they both do the same thing). You should see something similar to the following information displayed on your terminal:

```bash
[nodemon] 1.19.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./bin/www`
Begin server deployment Node.js script...
Free port captured: 3000. Normalizing for 'Express' object use.
Port successfully set to  3000
Server instance created.
Server successfully started on port  3000
Website active on: http://localhost:3000
```

From here, you can copy and paste the website link to your browser to view the website! In this particular example, you'd navigate to `http://localhost:3000`. When running in development mode, the port is __always__ 3000.

To run the server in production mode, type in `npm run prod`. All your `console.log` statements will be piped to log files in an automatically created directory called `logs`.

When running in production mode, the default server launch script behavior is to select a random port between 9500 to 9524, inclusive, and to run the server on that specified port. You will be able to see the selected port in the console log files (in the `logs/` directory) or in the Jenkins pipeline run console (if you are using Jenkins). If you wish to override this behavior and pick a static port number of your own, you can set the following environment variable in your terminal to a value greater than or equal to 3000. An invalid number (a number below 3000 or greater than 9999) will automatically be converted to port 3000. See below for an example of doing this:

```bash
export NODE_STATIC_PORT=3456; npm run prod;
```

This will run your production server on port `3456`.

**NOTE**:
* If you run this server in production mode, it will spawn a Node.js process in the background. You'll need the following command to kill this process from the terminal: ```npm run killserver```
* If you use [`Jenkins`](#jenkins), the deployment behavior will change significantly depending on how you configure your pipeline.



To kill a development server, simply type `CTRL+c` on your keyboard in the terminal running the node process. This will kill the server immediately. To restart a development server **without** killing the entire process, type `rs` in the terminal running the node process. The port


## Repository Structure
### Project root directory files
The project root directory files are the files you see in this project that are not in any subdirectories (i.e. `config`, `views`, `tests`, etc.). Each one will be briefly covered.

* **`.eslintrc.js`**: A configuration file for the [ESLint](https://eslint.org) tool, which "lints" (performs code-style checks on) your code. The default rules have been adapted from the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), which is widely considered the most strict and well-maintained style guide in the JavaScript community. If you choose to change this configuration, you can follow the steps on the `ESLint` documentation page in the link above to do so.
  * To run the `ESLint` tool, simply type the following command in
* **`.gitignore`**: Indicates which files should NOT be tracked/pushed to the remote repository.
* **`package.json` and `package-lock.json`**: The `package.json` is basically a project-level configuration file that `NPM` uses to manage package installations, identify your project, etc. `Node` uses the `package.json` file determine which scripts to run. See [this link](https://docs.npmjs.com/files/package.json) to find out more about the specific components of the `package.json` file. The `package-lock.json` is an autogenerated file from installed packages that represents the package dependency tree. It also ensures that no package corruption occurs by taking a hash of the installed package and comparing its hash to a remote hash for any related install/update. See more [here](https://docs.npmjs.com/files/package-lock.json).
* **app.js**: The main server file for this project. The script, `bin/www` imports `app.js` to start a development or production server depending on whether you run `npm run start` or `npm run prod`.
* **.editorconfig**: A config file to "maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs". See their [homepage](https://editorconfig.org/) for more information. If you're on Atom, download the [`editorconfig`](https://atom.io/packages/editorconfig) package to enable the `.editorconfig` settings. If you're on Visual Studio Code (VSCode), download the package [here](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

* **`README`**: This file.

### Project Folders
#### `views/`
This project uses [Handlebars](https://handlebarsjs.com/) as the templating/view engine. You should take a look at their documentation to figure out how to write `hbs` files, it's very simple to learn and only requires basic knowledge of HTML. The documentation page can be found at the link above under the **`Get Started`** section (click [here](https://handlebarsjs.com/) for a quick link). A basic view has been provided for you already; **do not remove the `layout.hbs` file**.

#### `tests/`
Tests are written using the [Mocha](https://mochajs.org/#getting-started) framework with the [Chai](https://www.chaijs.com/guide/styles/) plugin. Some basic unit tests have been provided for you to start.

#### `scripts/`
Basic `Bash` scripts that you can use. To get a history of Git commits, please type `npm run history` in your terminal at the root directory of this project.

#### `routes/`
The core routing modules that determine the business logic for your server. Modules (files) in `routes/` operate as `routers` for your business logic, which is defined in the `controllers/` subdirectory. What this means is that the files in the base `routes/` directory determine how the server should `route` or `direct` things. A file like `routes/root.router.js` is in charge of determining what action to take based on the requested URL path. Each router module is registered in `app.js` (see the [source code](app.js)) starting from line 68. You'll notice that we're telling the server, "whenever the root path, `/`, is requested, make the `root.router` router handle the request".

So, if a browser requests `localhost:9520/`, which is the root path, then we should send them the home page (see the [source code](routes/root.router.js) starting from line 32 for `root.router.js`). The corresponding logic (the actual action itself) is defined in a `controller`, which does exact what it sounds like: it `controls` the logic based on whatever you define it to do. So if you look at the [source code](routes/controllers/root.controller.js) for `root.controller.js`, you'll see a corresponding function called `sendHomepage`, which is what gets called whenever a browser requests the root path.

To better illustrate the routes/controllers concept, see the diagram below:

```
    (User)                      (Server)                (Router)
Navigate to localhost ----> Sees the request, ----> Sees which path was
on their browser.           determines which        requested; call the
                            route to serve          controller to do
                            based on user           some predefined
                            definitions.            action. Return the
                                                    results or display
                                                    some webpage, if any!

```

#### `resources/`
Resources (images) needed for this `README` file. Nothing actually important.

#### `public/`
All assets (images, stylesheets, JavaScript files) contained in `images/`, `javascripts/`, and `stylesheets/` that will be sent to the client. These are included in the Handlebars files within the `views/` directory. When you include a resource in the Handlebars template like [so](views/homepage.hbs), the Node.js server will automatically resolve the request to a file within this directory.

#### `Jenkins/`
[Jenkins](https://jenkins.io/) (the [unofficial docs](https://medium.com/@mightywomble/jenkins-pipeline-beginners-guide-f3868f715ed9#Jenkins-Pipeline(Beginnersguide)-Step-b) are a bit more concise) is a [DevOps](https://www.atlassian.com/devops) tool that enables [continuous integration/continuous development (CI/CD)](https://www.redhat.com/en/topics/devops/what-is-ci-cd).

In basic terms, this tool will automatically perform some steps, or stages, such as testing your code or deploying your server every time you push your changes to a remote repository. These steps are defined in a special [`Groovy-language`](https://groovy-lang.org/) script called a [`Jenkinsfile`](https://medium.com/@mightywomble/jenkins-pipeline-beginners-guide-f3868f715ed9#Jenkins-Pipeline(Beginnersguide)-TheJen). A [sample one has been provided for you](jenkins/Jenkinsfile) _**that works**_. You/your team may choose to edit this file however you/your team sees fit. You should hook this project up to a remote Jenkins server and configure the server to receive and use the Jenkinsfile as the "source of truth" for the steps the pipeline should take.

#### `bin/`
Contains executable scripts (written in `node` or `bash`) that should not be run directly. These are used to start, deploy, or tear down your development or production server. Do not edit these unless you know what you are doing!

#### `.vscode/`
Contains the default [VSCode IDE](https://code.visualstudio.com/) configurations for this project. You may change it as you see fit.

#### `.atom/`
Contains a sample default [Atom IDE](https://atom.io/) configuration. Since Atom's configurations are IDE-wide, you have to manually configure Atom with the provided options in your editor's `settings.cson` file.


When you want to make a contribution, make sure you first mark it as an issue **even if it's not a fix**. [Here's how to do that](https://help.github.com/articles/opening-an-issue-from-code/) if it's an issue with existing code. If it's a feature request or general development/release, just tag it as such. Also make sure you're on your **own branch first** (read [here](#contribute-overview) about how to do that) with **its own tag**. Make sure that this issue corresponds with an epic/milestone to ensure we're making progress towards our endgoal. Once you're done with your issue (assuming you've been commiting to the branch several times), you should create a pull request. Whoever reviews your code will decide to accept it and merge it to the `development` branch or reject it and **_should_** provide a reason why it was rejected. If the changes are accepted, remember to close the issue.


## Included Node.js Scripts, Commands and Tooling

There are numerous tools that have been provided as default tools for your use. Many of these tools do not have to be used directly; there are scripts and commands that enable you to use them in `package.json` under the `scripts` section.

### Important Scripts/Commands

The following scripts that have been provided to you as defaults, which you can also [view directly](package.json) in the `package.json` file:

* **`npm run test`**: Run your test modules located in the `tests/` directory with Mocha and the Chai plugin.
* **`npm run makedocs`**: Automatically document your code with the JSDoc tool, which creates a `code-docs` directory (you can open the `index.html` file to view the documentation online).
* **`npm run history`**: Gets a history of code commits for this project.
* **`npm run lint`**: Lints your code (ensures your code styling matches a certain standard) with the `ESLint` tool.
* **`npm run dev`**: Start a development server.
* **`npm run start`**: Alias for `npm run dev`. Starts a development server.
* **`npm run prod`**: Starts a production server as a **background** process.
* **`npm run killserver`**: Kill any existing server running in the background.
* **`npm run profile`**: **Typically unnecessary for a basic or small-scale server.** Start a development server that profiles `node.js` performance.

### Important Tooling

#### [Node Package Manager](https://www.npmjs.com)
The default package manager that comes installed with node.

#### [Nodemon](https://www.npmjs.com/package/nodemon)
Every time you start a development server with the `npm run start` or `npm run dev` commands, you are using `Nodemon` to automatically start and restart your server if you make any changes to your code (or if you manually restart it by typing `rs` in the terminal while `Nodemon` is running).

#### [ESLint](https://eslint.org/)
Ensure your code conforms to a specific code style.

#### [JSDoc](https://jsdoc.app/about-getting-started.html)
Automatically generate docs from your code with this tool. All you have to do is add specific annotations to your code to make this possible!

#### [Mocha](https://mochajs.org)
Test your code with this Node.js framework. This project uses the [Chai](https://www.chaijs.com/) plugin for assertion statements.

#### [Handlebars](https://handlebarsjs.com/)
This project uses Handlebars as the templating/view engine. You should take a look at their documentation to figure out how to write `hbs` files, it's very simple to learn and only requires basic knowledge of HTML.

#### [Helmet](https://helmetjs.github.io/)
The server has some basic security built in with the `Helmet` framework. This framework secures some [basic security vulnerabilities](https://www.cvedetails.com/vulnerability-list/vendor_id-12113/Nodejs.html). There are many other security tools you can (and should) use in addition to `Helmet` that can secure your codebase too, including `npm audit`.

#### [Debug](https://www.npmjs.com/package/debug)
A built in debugger is provided (`debug`) to log your code. However, if your server is running in production mode, all `console.log` statements get piped to a log file anyway so you/your team may find that the `debug` module is not necessarily required.


## General Code Contribution Best Practices

These code contribution best practices are **suggestions** rather than strict standards or requirements. You/your team may find different contribution standards more fitting to your/your team's needs.

### <a name="contribute">Debugging, testing, and contributing.</a>
### <a name="contribute-overview">Overview</a>
Before contributing, testing, or debugging, make sure you're familiar with [Git](https://www.atlassian.com/git) and [Git branching](https://learngitbranching.js.org).

Working together in teams on codebases typically requires an SCM like `Git` and good collaboration practices. The following information addresses this topic.

Typically, the primary `master` branch is __NOT__ master--it's `development`. In accordance with industry standards, the main branch we should always be working off of is `development`. See [this link](https://nvie.com/posts/a-successful-git-branching-model/) for information on why we want to branch this way. You want to be able to work together without stepping on each other's toes (too often). This strategy is one way of accomplishing that.

#### Git/GitHub Best Practices Summary:

Adapted from a really great [Stack Overflow accepted answer](https://softwareengineering.stackexchange.com/questions/165725/git-branching-and-tagging-best-practices):

```

In short: Best practice is branch out, merge often and always keep in sync.

There are pretty clear conventions about keeping your code in a separate branches
from master branch:

* You are about to make an implementation of major or disruptive change.
* You are about to make some changes that might not be used.
* You want to experiment on something that you are not sure it will work.

When you are told to branch out, others might have something they need to do in
master or development. Rule of thumb is after branching out, you should keep in sync
with the development branch: eventually you'll need to merge it back to development.

In order to avoid a huge complicated mess of conflicts when merging back,
you should commit often, merge often.


Good practices to follow
------------------------
A successful Git branching model by Vincent Driessen has good suggestions.
If this branching model appeals to you consider the flow extension to git.
Others have commented about flow.


Tagging practices
-----------------
As you already know, Git gives you commit identifiers like 1.0-2-g1ab3183 but those
are not tags! Tagging is done with git tag, and the tags that are created using git
tag are the base for the commit identifiers git describe creates.
In another words, in Git you don't tag branches. You are tagging commits.
It is correct to say that tag is just an annotated pointer to a commit.

Lets look at practical example that demonstrated it,

                        /-- [v1.0]
                       v
---.---.---.---S---.---A     <-- master
                         \
                           \-.---B     <-- test


Let's commit 'S' be commit pointed by tag 'v1.0'. This commit is both on branch
'master' and on branch 'test'. If you run "git describe" on top of commit 'A' (top of
'master' branch) you would get something like v1.0-2-g9c116e9. If you run "git
describe" on top of commit 'A' ( aka the 'test' branch) you would get something like
v1.0-2-g3f55e41 , that is the case with default git-describe configuration. Note that
this result is slightly different.  v1.0-2-g9c116e9 means that we are at commit with
sortened SHA-1 id of 9c116e9, 2 commits after tag v1.0. There is no tag v1.0-2!

If you want your tag to appear only on branch 'master', you can create new commit
(e.g. only update default / fallback version information in GIT-VERSION-FILE) after
branching point of 'test' branch. If you tag commits on 'test' branch with e.g.
'v1.0.3` it would be visible only from 'test'.

```

See image below for branching reference:

<p align="center">
<img src="resources/git-branch.png" alt="APAR Checklist">
</p>

### <a name="debugging">Debugging</a>
Since this repository contains server code, the best way to debug the code is by setting the `NODE_ENV` equal to `development` and running `npm run start`. Any errors will be caught and displayed in the terminal.


### <a name="testing">Testing</a>
Write unit tests for all the code you contribute. Unit tests test small pieces of your code to ensure that the logic operates as expected. Test all your code before you push your code to the remote repository -- that way, any other code .
