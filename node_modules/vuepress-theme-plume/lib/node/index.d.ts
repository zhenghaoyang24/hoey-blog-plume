import { Theme } from 'vuepress/core';
import { PlumeThemeOptions, ThemeConfig, NavItem, NotesOptions, NoteItem } from '../shared/index.js';
export * from '../shared/index.js';
export { NoteItem, NoteItem as NotesItem, NotesOptions } from '../shared/index.js';

declare function plumeTheme(options?: PlumeThemeOptions): Theme;

/**
 * 主题配置，在单独的 `plume.config.ts` 中使用的类型帮助函数
 */
declare function defineThemeConfig(config: ThemeConfig): ThemeConfig;
/**
 * 主题导航栏配置帮助函数
 */
declare function defineNavbarConfig(navbar: NavItem[]): NavItem[];
/**
 * 主题 notes 配置帮助函数
 */
declare function defineNotesConfig(notes: NotesOptions): NotesOptions;
/**
 * 主题 notes item 配置帮助函数
 */
declare function defineNoteConfig(note: NoteItem): NoteItem;
/**
 * @deprecated use `defineNotesConfig` instead
 */
declare function definePlumeNotesConfig(notes: NotesOptions): NotesOptions;
/**
 * @deprecated use `defineNoteConfig` instead
 */
declare function definePlumeNotesItemConfig(item: NoteItem): NoteItem;
/**
 * @deprecated move to `defineNavbarConfig`
 */
declare function defineNavbar(navbar: NavItem[]): NavItem[];

export { plumeTheme as default, defineNavbar, defineNavbarConfig, defineNoteConfig, defineNotesConfig, definePlumeNotesConfig, definePlumeNotesItemConfig, defineThemeConfig, plumeTheme };
