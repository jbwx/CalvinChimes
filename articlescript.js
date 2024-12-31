// we wait for the icons bar to load. Inshallah there it a better way to do this
setTimeout(function () {
  main();
}, 1000);

function main() {
  let iconBar = document.querySelector(
    ".sno-row-icons.sno-row-icons-side.full-color",
  );
  // iconBar existing indicates the page is an article.
  // in the future, a better way to do this could be the number of "/"s in the URL
  if (iconBar) {
    // we insert these CSS rules
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `.sno-row-icon {
          background-color: transparent !important;
          box-shadow: none !important;
          color: black !important;
        }`,
      styleSheet.cssRules.length,
    );
    // Couldn't find an easy way to override these, so we go to the element level and do it there.
    // accounts for all 6 of the share icons, in descending order
    document.querySelector(
      "#sno-main-content > div > div > div.sno-story-social-icons > div.sno-row-icons.sno-row-icons-side.full-color > div.comment-row-icon.sno-row-icon > div",
    ).style.border = "none";
    document.querySelector(
      "#sno-main-content > div > div > div.sno-story-social-icons > div.sno-row-icons.sno-row-icons-side.full-color > div.like-row-icon.sno-row-icon > div.sno-row-icon-ring",
    ).style.border = "none";
    document.querySelector(
      "#sno-main-content > div > div > div.sno-story-social-icons > div.sno-row-icons.sno-row-icons-side.full-color > a:nth-child(3) > div > div",
    ).style.border = "none";
    document.querySelector(
      "#sno-main-content > div > div > div.sno-story-social-icons > div.sno-row-icons.sno-row-icons-side.full-color > a:nth-child(4) > div > div",
    ).style.border = "none";
    document.querySelector(
      "#sno-main-content > div > div > div.sno-story-social-icons > div.sno-row-icons.sno-row-icons-side.full-color > a.modal-share.share-email > div > div",
    ).style.border = "none";
    document.querySelector(
      "#sno-main-content > div > div > div.sno-story-social-icons > div.sno-row-icons.sno-row-icons-side.full-color > a.sno-print-icon > div > div",
    ).style.border = "none";
  }
}
