import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
        dir: 'patch',
        link: '/patch/',
        sidebar: 'auto',
    },

)

export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [demoNote],
})
