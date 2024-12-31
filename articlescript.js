// .sno-row-icon {
//     background-color: transparent !important;
//     box-shadow: none !important;
// }

// .hover-full-color-inverse.comment-row-icon .sno-row-icon-ring {
//    border-color: #ffffff00 !important;
// }

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `.sno-row-icon {
      background-color: transparent !important;
      box-shadow: none !important;
      color: black !important;
    }`,
  styleSheet.cssRules.length,
);
// styleSheet.insertRule(
//   `.sno-row-icon-ring {
//       border-color: #ffffff00 !important;
//       background-color: #ffffff00 !important;
//     }`,
//   styleSheet.cssRules.length,
// );
// styleSheet.insertRule(
//   `.hover-full-color-inverse.email-row-icon .sno-row-icon-ring {
//       border-color: #ffffff00 !important;
//   }`,
//   styleSheet.cssRules.length,
// );

setTimeout(function () {
  main();
}, 1000);

function main() {
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

  let iconBar = document.querySelector(
    ".sno-row-icons.sno-row-icons-side.full-color",
  );
  if (iconBar) {
    adjustBar();
    window.addEventListener("scroll", function () {
      adjustBar();
    });
  }
}

function adjustBar() {
  let scrollY = window.scrollY || document.documentElement.scrollTop;
  console.log(scrollY);
  let iconBar = document.querySelector(
    ".sno-row-icons.sno-row-icons-side.full-color",
  );
  let scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  // pre-article: iconBar.style.top = "70vh" 0-135
  // normally: iconBar.style.top = "55vh" 135-(scrollHeight - 761)
  // post-article: iconBar.style.top = "43vh" (scrollHeight - 761)-scrollHeight
}
