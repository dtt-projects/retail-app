# APAR Checklist Server

## Table of Contents
1. [What is this repository?](#what-is-this-repo)
2. [Repository Layout, Methodology and Resources Used](#methodology)
    * [Overview](#methodology-overview)
    * [Node.js](#methodology-node)
    * [Git/GitHub](#methodology-git)
    * [Testing](#methodology-testing)
    * [Additional Tools or Libraries](#methodology-other-tools)
3. [How do I Run this App?](#run-app)
    * [MacOS / Linux](#unix-install)
    * [Windows](#windows-install)
4. [Debugging, Testing, and Contributing](#contribute)
    * [Overview](#contribute-overview)
    * [Debugging](#debugging)
    * [Testing](#testing)
    * [Helping Out with This Project](#permissions)
5. [Issues](#issues)


## <a name="what-is-this-repo">What is this repository?</a>
This is the server repository for the APAR Checklist conversion project. The server is built with a suite of open-source tools and libraries. The core of the front-end build relies on the [Node.js](https://nodejs.org), which is actively developed and maintained by several organizations. This library is in compliance with the IBM Open Source Guidelines since it maintains a MIT License, one of the most "permissive" licenses available. For more information on IBM Open Source Guidelines (usage AND contributions), click [here](https://w3.ibm.com/developer/ossite/OSPGCourse/).

When you want to make a contribution, make sure you first mark it as an issue **even if it's not a fix**. [Here's how to do that](https://help.github.com/articles/opening-an-issue-from-code/) if it's an issue with existing code. If it's a feature request or general development/release, just tag it as such. Also make sure you're on your **own branch first** (read [here](#contribute-overview) about how to do that) with **its own tag**. Make sure that this issue corresponds with an epic/milestone to ensure we're making progress towards our endgoal. Once you're done with your issue (assuming you've been commiting to the branch several times), you should create a pull request. Whoever reviews your code will decide to accept it and merge it to the `development` branch or reject it and **_should_** provide a reason why it was rejected. If the changes are accepted, remember to close the issue. 

Contributions to this project should ONLY be made to the following location:

> `https://github.ibm.com/APAR-Checklist/server`

Other major tools used in this repository that you can learn about include (this is a rolling list updated whenever a new library, framekwork or tool is introduced):

* [Node Package Manager](https://www.npmjs.com)
* [Yarn Package Manager](https://yarnpkg.com)
* [ESLint](https://eslint.org)
* [Mocha](https://mochajs.org)
* [`.env` Files](https://file.org/extension/env)
* [Git](https://git-scm.com)

## <a name="methodology">Repository layout, methodology and resources used</a>
### <a name="methodology-overview">Overview</a>
In general, root-level configuration files such as `.babelrc` or `.dockerignore` are placed there because the tools that use these configuration files require them to be there. Whenever possible, **_put files in specific locations_**. That is, if you're adding a new server route, **_don't leave it in the root directory_**. This causes unnecessary clutter and will cause a lot of confusion as we continue development and debugging.

### <a name="methodology-docker">Docker</a>
We're using [`Docker`](https://www.docker.com) to standardize the environment in which we code, test, build, and run this project. This ensures that any contributions, changes, or fixes we make can easily be run and/or replicated on anyone else's environment, regardless of their operating system.

See [this file](docs/docker.md) for more information regarding our specific Docker build.

### <a name="methodology-node">Node.js</a>
Our Node.js project will follow [this project layout](https://blog.codeship.com/advanced-node-js-project-structure-tutorial/). 

### <a name="methodology-git">Git/GitHib Contributions</a>
See [below](#contribute-overview).

### <a name="methodology-testing">Testing</a>
Similar to our Git methodology, we want to test early and often. We'll be using the `Mocha` testing framework. All tests should be placed into the `test/` folder.

Test files should be named with the following convention:
```bash 
[name].test.js
```

Where `name` is the corresponding file name in `web/`. So, if you have a file named `server.js` in `web/`, then the corresponding name of the file in test should be `server.test.js`.

### <a name="methodology-other-tools">Additional Tools/Libraries</a>
Regarding the other tools and libraries we're using, such as Babel or Webpack, these are basic building-block tools that we need to use to make sure we can run our project. Any additional tools that we want to consider should be noted on the GitHub page under the `Issues` tab (yes, I know it's not an issue, but that's where we'll track everything from issues to feature requests).

## <a name="run-app">How do I run this app?<a/>
Install [Docker](https://www.docker.com/get-started). Make sure you're using the community edition. Follow instructions [here](docs/docker.md) to get a Docker container up and running.

If Docker has not been properly configured yet, use the temporary `install.sh` or `install.ps1` file to help you install dependencies needed for this project. More info on this below. 

### <a name="unix-install">If you're on MacOS or Linux</a>:
* IF YOU'RE FAMILIAR WITH TERMINAL OR ON LINUX:
    1. After downloading this repository, install [Git](https://git-scm.com/download/linux).
    
    2. open up Terminal 
        * MacOS: `cmd+space -> type "terminal" -> hit enter`
        * Linux: Depending on your distribution, you may require extra navigation steps. In general, you'd type `super -> 'terminal'` and hit enter. 
    3. Change directories into this project.
    4. Once you're in the root of this project (this directory and not a subdirectory of `frontend`), copy and paste the following command into terminal: 
        > ```bash scripts/install/install.sh```
        * Note that ZSH is also supported.
* IF YOU'RE NOT FAMILIAR WITH TERMINAL AND ON A MAC:
    1. After downloading this repository, open Finder and navigate to this downloaded repository. More likely than not, you'll have to unzip this directory by double clicking on it. Go into the folder that gets extracted from the zip file (it should have the same name with a blue folder icon).
    2. Go into the `scripts` folder -> `install` folder -> double click on `install.command`.

Your dependencies have been installed! Run this command to actually start the development server (to see the project live):

> ```yarn start```

### <a name="windows-install">If you're on Windows</a>:
1. After downloading this repository from Github, open up file explorer and navigate to this folder.
    * If you don't have Git Bash, I highly advise you to [download it](https://gitforwindows.org). This tool provides you a near-complete bash-like environment for windows. If you're familiar with the Bash shell and have downloaded this tool, open up this tool and go to the MacOS/Linux section above and start from step 2. Otherwise, continue along below.
2. Go into `scripts -> install -> install.ps1`
3. Right click on `install.ps1` and click `Run as administrator`.
4. This should install all necessary dependencies. 
5. Jump up one level and double-click on start.ps1 to start this project.

## <a name="contribute">Debugging, testing, and contributing.</a>
### <a name="contribute-overview">Overview</a>
Before contributing, testing, or debugging, make sure you're [familiar with Git](https://learngitbranching.js.org).

In this repository, our primary "master" branch is __NOT__ master--it's development. In accordance with industry standards, the main branch we should always be working off of is `development`. See [this link](https://nvie.com/posts/a-successful-git-branching-model/) for more details regarding this practice. If you'd like to add a feature or fix an issue, open a branch **_off of development_**. The new branch off of development should have a concise and descriptive name that immediately indicates its intention to another contributor. So, for example, if we wanted to add a sliding menu as a new feature, we would name it "left-sliding-menu". Make sure to also add a tag to the new branch that indicates its purpose.

Acceptable tags include the following:

<br>

| Tag Name | Description |
| -------- | ----------- |
| Feature  | A new piece of functionality that this branch should provide by the time a pull request is issued |
| Release  | Support preparation of a new production release. |
| Fix      | A standard fix that is not urgent. |
| Hot Fix  | very much like release branches in that they are also meant to prepare for a new production release, albeit unplanned. They arise from the necessity to act immediately upon an undesired state of a live production version. |

<br>

### Git/GitHub Best Practices Summary:

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
<img src="resources/img/gitbranch.png" alt="APAR Checklist">
</p>

### <a name="debugging">Debugging</a>
Since this repository contains server code, the best way to debug the code is by setting the `NODE_EV` equal to `development` and running `yarn profile`.


### <a name="testing">Testing</a>
The testing suite we'll be using is `mocha`--it's widely accepted across the industry and provides a great, easy way to test our code. All testing files should be placed in [`test/`](test/). To run the tests, simply type in `yarn test` in your command line. Tests are also automatically run when you `git push` your code.

### <a name="permissions">Permissions</a>
If you don't have access and would like to contribute to this project, contact the project owner, <a href="mailto:kfadden@us.ibm.com">Kathy Fadden</a>, or pay her a [visit](https://w3.ibm.com/bluepages/profile.html?uid=541005897) for information. If you've helped out in any way, please make sure you get your name on [`CONTRIBUTING.md`](CONTRIBUTING.md)!

## <a name="issues">Issues.</a>
Issues should **_BE SUBMITTED ON GITHUB_**. Here's the [link](https://github.ibm.com/apar-checklist/frontend/issues) for submitting issues.

Issues should follow a standardized template, adapted from the OSS community. **Use the template**. It will save us a lot of time and hair-pulling. If issues pertain to a milestone, please tag the milestone.
