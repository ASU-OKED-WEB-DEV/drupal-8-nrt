## Guidelines for Developers
Following strict guidelines may create additional work; however, it will benefit the team as as a whole, and it will pay off in the long run.

## New Repos
- If you're creating a new repo, make sure to protect the master branch so that code contributions can only be done through Pull Requests.
- Enforce code reviews (by at least one team member) in pull request workflow.

## Development Workflow
Anytime you want to contribute to this repo, follow the steps below:
- Check if the feature or bugfix you want to work on already exist on the issue queue.
- If it does, check if there's someone assigned to that ticket. If no one is, assign yourself to it. Otherwise, talk to the assigned developer and check if he/she needs help.
- If it doesn't, create a new issue and assign it to yourself. 
- Set up your local development environment by cloning this repo and following instructions on README file.
- If you picked an issue that already existed, check if there's already a branch associated to that issue. If there is, checkout that branch and code away.
- If you created a new issue, create a new branch by following the naming conventions below. Then code away.
- When you're done working on an issue, create a pull request and have someone test your new feature/bugfix and review your code. 
- Once the code has been reviewed and approved, the pull request can be merged.

## Branch naming conventions
Use one of the prefixes below followed by two hyphens, to prefix your branch name.
- `feature`: For new features (e.g. feature--latest-news-block, feature--home-page-slideshow, feature--contact-page, etc).
- `bugfix`: For bugfixes (e.g. bugfix--prevent-sql-injection-in-contact-form, bugfix--fix-php-warning-in-home-page).
- `docs`:  For documentation (e.g. docs--add-guidelines-for-contributors).
- `misc`: If none of the above applies use this prefix.

## Important links
- [Drupal coding standards page](https://www.drupal.org/docs/develop/standards).
- [PHP The Right Way](http://www.phptherightway.com/).
