    document.addEventListener("DOMContentLoaded", function () {
        addCustomSearch();
        fetchNews();
    });

    function hide3Dots() {
        document.querySelector("#carouselcarousel-2 > ol").style.display =
            "none";
    }

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
                window.location =
                    "https://calvinchimes.org/?s=" + varJWSearch.value;
            }
        });
    }
    function fetchNews() {
        fetch("https://calvinchimes.org/category/sports/")
            .then((response) => {
                return response.text();
            })
            .then((fetchedHTML) => {
                /* get first article with image
                   get first article. If image article, goto next
                   Note: there are 12 articles on the page
                   */
                let storiesHTML = [];
                console.log(fetchedHTML);
                for (let i = 0; i < 12; i++) {
                    let articleHTML = fetchedHTML
                        .split(
                            `<div class="profile-rendered catlist-tile sno-tile-clickable sno-tile-resized"`,
                        )
                        [
                            i + 1
                        ].split(`<div` + ` class="cl` + `ear"></div` + `></div` + `></div>`)[0];
                    storiesHTML[i] = articleHTML;
                    console.log(articleHTML);
                }
            });
    }
