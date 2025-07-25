import { defineNoteConfig, defineNotesConfig } from "vuepress-theme-plume";

const noteWeb = defineNoteConfig({
  dir: "web",
  link: "/web/",
  sidebar: "auto",
});
const noteAndroid = defineNoteConfig({
  dir: "android",
  link: "/android/",
  sidebar: "auto",
});
const noteMemo = defineNoteConfig({
  dir: "memo",
  link: "/memo/",
  sidebar: "auto",
});

const noteMore = defineNoteConfig({
  dir: "more",
  link: "/more/",
});

const noteNodejs = defineNoteConfig({
  dir: "nodejs",
  link: "/nodejs/",
  sidebar: "auto",
});

export const notes = defineNotesConfig({
  dir: "notes",
  link: "/",
  notes: [noteWeb, noteAndroid, noteMemo, noteMore, noteNodejs],
});
