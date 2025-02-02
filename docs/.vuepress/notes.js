import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
        dir: 'patch',
        link: '/patch/',
        sidebar: 'auto',
    },
)

const demoNote2 = defineNoteConfig({
        dir: 'interview',
        link: '/interview/',
        sidebar: 'auto',
    },
)

export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [demoNote,demoNote2],
})
