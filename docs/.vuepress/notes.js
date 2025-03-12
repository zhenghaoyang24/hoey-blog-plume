import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'

const notePatch = defineNoteConfig({
        dir: 'patch',
        link: '/patch/',
        sidebar: 'auto',
    },
)

const noteInterview = defineNoteConfig({
        dir: 'interview',
        link: '/interview/',
        sidebar: 'auto',
    },
)

const noteMore = defineNoteConfig({
        dir: 'more',
        link: '/more/',
    },
)

export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [notePatch,noteInterview,noteMore],
})
