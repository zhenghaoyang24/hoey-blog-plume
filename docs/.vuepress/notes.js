import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
        dir: 'chalou',
        link: '/chalou/',
        sidebar: 'auto',
    },

)

export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [demoNote],
})
