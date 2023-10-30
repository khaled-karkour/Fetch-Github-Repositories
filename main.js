let input = document.querySelector(
  ".repos-container .get-repos-container .get-repos input"
);
let getButton = document.querySelector(
  ".repos-container .get-repos-container .get-repos .get-button"
);
let reposData = document.querySelector(".repos-container .show-data");
let getReposContainer = document.querySelector(
  ".repos-container .get-repos-container"
);

getButton.onclick = function () {
  [...reposData.children].forEach((e) => {
    e.remove()
  })
  getRepos();
};

function valueCheck() {
  let errorSpan = document.createElement("span");
  errorSpan.className = "error";
  let errorSpanText = document.createTextNode(
    "* Please Write Github Username."
  );
  errorSpan.appendChild(errorSpanText);
  getReposContainer.appendChild(errorSpan);
  input.className = "error";
}

function getRepos() {
  if (input.value === "") {
    if (getReposContainer.childElementCount === 1) {
      valueCheck();
    }
    input.onkeyup = function () {
      if (getReposContainer.childElementCount === 2) {
        input.className = "";
        getReposContainer.children[1].remove();
      }
    };
  } else {
    
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((repositories) => {
        repositories.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);
          let theUrl = document.createElement("a");
          let theUrlText = document.createTextNode("Visit");
          theUrl.appendChild(theUrlText);
          theUrl.href = `https://github.com/${input.value}/${repo.name}`;
          theUrl.setAttribute("target", "_blank");
          mainDiv.appendChild(theUrl);
          let starsSpan = document.createElement("span");
          let starsText = document.createTextNode(
            `${repo.stargazers_count} Stars`
          );
          starsSpan.appendChild(starsText);
          mainDiv.appendChild(starsSpan);
          mainDiv.className = "repo-box";
          reposData.appendChild(mainDiv);
        });
        if (reposData.childElementCount > 1) {
          reposData.children[0].remove();
        }
      });
  }
}
