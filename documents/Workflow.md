[Git style guide](https://github.com/agis/git-style-guide)

### Git feature branch workflow
* `git pull origin main`
* `git checkout -b BRANCHNAME`
* _work work work work_
* `git add . / -A /-p`
* `git commit` / `git commit -m "MESSAGE"`
  * Ready for staging:
    * `git push origin BRANCHNAME`
    * Create a Pull Request for your branch and tag teammates for review
  * Ready for production:
    * _todo_

### Checking out pull requests locally
* `git fetch origin pull/ID/head:BRANCHNAME` (ID=ID number of Pull Request)
* `git checkout BRANCHNAME`

### Updating your feature branch with changes from main branch
* `git checkout BRANCHNAME`
* `git rebase main`
