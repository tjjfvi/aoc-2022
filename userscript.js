// ==UserScript==
// @name         Advent of Code Tweaks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       tjjfvi
// @match        https://adventofcode.com/*
// @icon         https://www.google.com/s2/favicons?domain=adventofcode.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Click codeblock to copy
  for (const pre of document.querySelectorAll("pre, code")) {
    pre.style.transition = "color .1s"
    pre.addEventListener("auxclick", async e => {
      e.preventDefault()
      await navigator.clipboard.writeText(pre.textContent)
      pre.style.color = "#009900"
      setTimeout(() => pre.style.color = "", 100)
    })
    //pre.style.cursor = "pointer"
  }

  // Paste into answer box on submit
  const answer = document.querySelector("input[type='text']");
  const submit = document.querySelector("input[type='submit']");
  submit.addEventListener("click", async e => {
    if (answer.value) return
    e.preventDefault();
    const value = await (await (await navigator.clipboard.read())[0].getType("text/plain")).text();
    console.log(value)
    answer.value = value;
    // submit.click();
  });

})();