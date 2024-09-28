document.addEventListener("DOMContentLoaded", async () => {
  addCustomSearch();
  console.log(
    await fetchNews(
      "https://calvinchimes.org/category/campus-community/",
      false,
      true,
      false,
    ),
  );
  waitForElement("#carouselcarousel-2 > ol", false, function (element) {
    element.style.display = "none";
  });
  waitForElement(
    "#wrap > header > div.sno-header-wrap.sno-header-wrap-desktop > div.sno-designer-area-row.sno-designer-row-fullscreen.snoads-unplaced > div",
    false,
    function (element) {
      element.style.display = "none";
    },
  );
});

function addCustomSearch() {
  let menuBar = document.getElementById("menu-paper-sections");
  menuBar.innerHTML += `

    <button type="submit" class="sno-hac-submit-search-button sno-search fa fa-search" onclick="expandSearch()">
        <span class="icon-hidden-text">Submit Search</span>
    </button>

    `;
}

function expandSearch() {
  let menuBar = document.getElementById("menu-paper-sections");
  let menuBarClone = menuBar.innerHTML;
  menuBar.innerHTML = `
          <style>

              # menu-paper-sections {
                  animation-name: openSearch;
                  animation-duration: 0.25s;
              }

              .jwSearch {
                  margin-left: 0;
                  width: 100%;
                  background-color: white !important;
                  border: none;
                  border-color: transparent;
                  font-family: Rubik;
                  font-size: 15px;
                  animation-name: openSearch;
                  animation-duration: 0.25s;
              }

              @keyframes openSearch {
                  from {
                      width: 0%;
                  }
                  to {
                      width: 80%;
                  }
                  to {
                      width: 100%;
                  }
              }

              .jwSearch:focus {
                  outline-width: 0;
              }

          </style>
          <link rel="icon" type="image/x-icon" href="https://calvinchimes.org/wp-content/uploads/2020/02/3-chime-icon.png">
          <input type="text" class="jwSearch" id="IDjwSearch" placeholder="Search the Chimes"><br>

          `;

  let varJWSearch = document.getElementById("IDjwSearch");

  varJWSearch.focus();

  varJWSearch.addEventListener("blur", function () {
    menuBar.innerHTML = menuBarClone;
  });

  varJWSearch.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      window.location = "https://calvinchimes.org/?s=" + varJWSearch.value;
    }
  });
}
async function fetchNews(src, s1i, s2i, s3i) {
  console.log("fetching news...");
  fetch(src)
    .then((response) => {
      return response.text();
    })
    .then((fetchedHTML) => {
      /* get first article with image
                   get first article. If image article, goto next
                   Note: there are 12 articles on the page
                   */
      let storiesHTML = [];
      let storyObjects = [];
      let usedStories = [];
      for (let i = 0; i < 12; i++) {
        let articleHTML = fetchedHTML
          .split(`<div class='catlist-tile-inner'>`)
          [i + 1].split(`<div class="clear"></div>`)[0];
        storiesHTML[i] = articleHTML;
      }
      // find the first story with an image

      storyObjects[0] = getStory(s1i);
      storyObjects[1] = getStory(s2i);
      storyObjects[2] = getStory(s3i);
      return storyObjects;

      function getStory(needsImage) {
        for (let i = 0; i < 12; i++) {
          if (usedStories[i] != true) {
            let thisStory = storiesHTML[i];
            let image = "";
            if (storiesHTML[i].includes(`<img src=`) && needsImage) {
              image = thisStory.split(`<img src="`)[1].split(`"`)[0];
            }
            let title = thisStory
              .split(`title='Permanent Link to Story'>`)[1]
              .split(`</a>`)[0];
            let subtext = thisStory
              .split(`<div class='catlist-teaser'>`)[1]
              .split(`</div>`)[0]
              .replace(`<p>`, ``)
              .replace(`</p>`, ``);
            let link = thisStory.split(`href='`)[1].split(`'`)[0];
            let author = thisStory
              .split(`class="creditline">`)[1]
              .split(`</a>`)[0];
            let authorLink = thisStory
              .split(`<span class='catlist-writer'> <a href="`)[1]
              .split(`"`)[0];
            // remove tabs and newlines from each string
            image = image.replaceAll("\t", "").replaceAll("\n", "");
            title = title.replaceAll("\t", "").replaceAll("\n", "");
            subtext = subtext.replaceAll("\t", "").replaceAll("\n", "");
            link = link.replaceAll("\t", "").replaceAll("\n", "");
            author = author.replaceAll("\t", "").replaceAll("\n", "");
            authorLink = authorLink.replaceAll("\t", "").replaceAll("\n", "");
            // replace all '&#038;' with '&'
            image = image.replaceAll("&#038;", "&");
            title = title.replaceAll("&#038;", "&");
            subtext = subtext.replaceAll("&#038;", "&");
            link = link.replaceAll("&#038;", "&");
            author = author.replaceAll("&#038;", "&");
            authorLink = authorLink.replaceAll("&#038;", "&");

            result = {
              image: image,
              title: title,
              subtext: subtext,
              link: link,
              author: author,
              authorLink: authorLink,
            };
            usedStories[i] = true;
            return result;
            break;
          }
        }
      }
    });
}

function waitForElement(query, continuous, callback) {
  console.log("Listening for element '" + query + "'...");
  const observer = new MutationObserver(() => {
    const element = document.querySelector(query);
    // if exists, and if not already modified
    if (element && !element.hasAttribute("cScriptModified")) {
      element.setAttribute("cScriptModified", true); // mark as modified
      if (!continuous) {
        observer.disconnect();
      }
      console.log("Found element '" + query + "'");
      callback(element); // call the callback function with found element as arg
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Initial check in case the element is already present
  const element = document.querySelector(query);
  if (element && !element.hasAttribute("cScriptModified")) {
    element.setAttribute("cScriptModified", true);
    if (!continuous) {
      observer.disconnect();
    }
    console.log("Found element '" + query + "'");
    callback(element);
  }
}
