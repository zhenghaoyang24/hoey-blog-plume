import * as vue from 'vue';
import { Ref, ComputedRef, InjectionKey, App, MaybeRefOrGetter, MaybeRef } from 'vue';
import { PlumeThemeBlogPostItem as PlumeThemeBlogPostItem$1, PlumeThemeBlogPostData, BulletinOptions, PlumeThemeData, PlumeThemeLocaleData, PlumeThemePageData, PlumeThemeHomeFrontmatter, PlumeThemePostFrontmatter, PlumeThemeFriendsFrontmatter, PlumeThemePageFrontmatter, NavItemWithLink, PlumeThemeHomeHero, ResolvedNavItem, ThemeOutline, PresetLocale, Sidebar, SidebarItem, ResolvedSidebarItem } from '../../shared/index.js';
import { PageDataRef, PageFrontmatterRef, SiteLocaleDataRef, useRoute, useRouter, Router } from 'vuepress/client';
import { RouteParamValueRaw } from 'vue-router';

declare function useAside(): {
    isAsideEnabled: vue.ComputedRef<boolean>;
};

type ShortPostItem$1 = Pick<PlumeThemeBlogPostItem$1, 'title' | 'path' | 'createTime'>;
declare function useArchives(): {
    archives: vue.ComputedRef<{
        label: string;
        list: ShortPostItem$1[];
    }[]>;
};

interface BlogCategoryItemWithPost {
    type: 'post';
    title: string;
    path: string;
}
interface BlogCategoryItem {
    id: string;
    type: 'category';
    sort: number;
    title: string;
    items: (BlogCategoryItem | BlogCategoryItemWithPost)[];
}
type BlogCategory = (BlogCategoryItem | BlogCategoryItemWithPost)[];
declare function useBlogCategory(): {
    categories: vue.ComputedRef<BlogCategory>;
};

interface PageCategoryData {
    id: string;
    sort: number;
    name: string;
}

interface PlumeThemeBlogPostItem {
    title: string;
    excerpt: string;
    path: string;
    tags?: string[];
    sticky?: boolean | number;
    categoryList?: PageCategoryData[];
    createTime: string;
    lang: string;
    encrypt?: boolean;
    cover?: string | BlogPostCover;
}
type BlogPostCoverLayout = 'left' | 'right' | 'odd-left' | 'odd-right' | 'top';
interface BlogPostCover {
    /**
     * 封面图链接地址，只能使用 绝对路径 以及 远程图片地址
     */
    url: string;
    /**
     * 博客文章封面图的位置
     */
    layout?: BlogPostCoverLayout;
    /**
     * 博客文章封面图的比例
     *
     * @default '4:3'
     */
    ratio?: number | `${number}:${number}` | `${number}/${number}`;
    /**
     * 封面图的宽度, 仅在 layout 为 'left' 或 'right' 时生效
     *
     * @default 240
     */
    width?: number;
    /**
     * 是否使用紧凑模式，紧凑模式下，封面图紧贴容器边缘
     * @default false
     */
    compact?: boolean;
}

type BlogDataRef = Ref<PlumeThemeBlogPostData>;
declare const blogPostData: BlogDataRef;
declare function usePostList(): BlogDataRef;
declare function useLocalePostList(): vue.ComputedRef<PlumeThemeBlogPostItem[]>;

declare function useBlogExtract(): {
    hasBlogExtract: vue.ComputedRef<boolean>;
    tags: vue.ComputedRef<{
        link: string | undefined;
        text: string | undefined;
        total: number;
    }>;
    archives: vue.ComputedRef<{
        link: string | undefined;
        text: string | undefined;
        total: number;
    }>;
    categories: vue.ComputedRef<{
        link: string | undefined;
        text: string | undefined;
        total: number;
    }>;
};

declare function usePostListControl(homePage: Ref<boolean>): {
    postList: vue.ComputedRef<PlumeThemeBlogPostItem$1[]>;
    page: Ref<number, number>;
    totalPage: vue.ComputedRef<number>;
    pageRange: vue.ComputedRef<{
        value: number | string;
        more?: true;
    }[]>;
    isLastPage: vue.ComputedRef<boolean>;
    isFirstPage: vue.ComputedRef<boolean>;
    isPaginationEnabled: vue.ComputedRef<boolean>;
    changePage: (current: number) => void;
};

type ShortPostItem = Pick<PlumeThemeBlogPostItem$1, 'title' | 'path' | 'createTime'>;
declare function useTags(): {
    tags: vue.ComputedRef<{
        name: string;
        count: string | number;
        className: string;
    }[]>;
    currentTag: vue.Ref<string, string>;
    postList: vue.ComputedRef<ShortPostItem[]>;
    handleTagClick: (tag: string) => void;
};

declare function useBulletin<T extends Record<string, any> = Record<string, any>>(): ComputedRef<BulletinOptions & T | undefined>;
declare function useBulletinControl<T extends Record<string, any> = Record<string, any>>(): {
    bulletin: ComputedRef<BulletinOptions & T | undefined>;
    enableBulletin: ComputedRef<boolean>;
    showBulletin: Ref<boolean>;
    close: () => void;
};

declare function useContributors(): ComputedRef<string[]>;

type DarkModeRef = Ref<boolean>;
declare const darkModeSymbol: InjectionKey<DarkModeRef>;
declare function setupDarkMode(app: App): void;
/**
 * Inject dark mode global computed
 */
declare function useDarkMode(): DarkModeRef;

type ThemeDataRef<T extends PlumeThemeData = PlumeThemeData> = Ref<T>;
type ThemeLocaleDataRef<T extends PlumeThemeData = PlumeThemeData> = ComputedRef<T>;
declare const themeLocaleDataSymbol: InjectionKey<ThemeLocaleDataRef>;
declare const themeData: ThemeDataRef;
declare function useThemeData<T extends PlumeThemeData = PlumeThemeData>(): ThemeDataRef<T>;
declare function useThemeLocaleData<T extends PlumeThemeData = PlumeThemeData>(): ThemeLocaleDataRef<T>;
declare function setupThemeData(app: App): void;

type FrontmatterType = 'home' | 'post' | 'friends' | 'page';
type Frontmatter<T extends FrontmatterType = 'page'> = T extends 'home' ? PlumeThemeHomeFrontmatter : T extends 'post' ? PlumeThemePostFrontmatter : T extends 'friends' ? PlumeThemeFriendsFrontmatter : PlumeThemePageFrontmatter;
interface Data<T extends FrontmatterType = 'page'> {
    theme: ThemeLocaleDataRef<PlumeThemeLocaleData>;
    page: PageDataRef<PlumeThemePageData>;
    frontmatter: PageFrontmatterRef<Frontmatter<T> & Record<string, unknown>>;
    lang: Ref<string>;
    site: SiteLocaleDataRef;
    isDark: Ref<boolean>;
}
declare function useData<T extends FrontmatterType = 'page'>(): Data<T>;

declare function useEditLink(): ComputedRef<null | NavItemWithLink>;

type EncryptConfig = readonly [
    boolean,
    string,
    string,
    string[],
    Record<string, string>
];
interface EncryptDataRule {
    key: string;
    match: string;
    rules: string[];
}
interface EncryptData {
    global: boolean;
    separator: string;
    admins: string[];
    matches: string[];
    ruleList: EncryptDataRule[];
}
type EncryptRef = Ref<EncryptData>;
declare const encrypt: EncryptRef;
declare function useEncryptData(): EncryptRef;

interface Encrypt {
    hasPageEncrypt: Ref<boolean>;
    isGlobalDecrypted: Ref<boolean>;
    isPageDecrypted: Ref<boolean>;
    hashList: Ref<EncryptDataRule[]>;
}
declare const EncryptSymbol: InjectionKey<Encrypt>;
declare function setupEncrypt(): void;
declare function useEncrypt(): Encrypt;
declare function useEncryptCompare(): {
    compareGlobal: (password: string) => Promise<boolean>;
    comparePage: (password: string) => Promise<boolean>;
};

interface UseFlyoutOptions {
    el: Ref<HTMLElement | undefined>;
    onFocus?: () => void;
    onBlur?: () => void;
}
declare const focusedElement: Ref<HTMLElement | undefined, HTMLElement | undefined>;
declare function useFlyout(options: UseFlyoutOptions): Readonly<Ref<boolean, boolean>>;

interface TintPlate {
    r: {
        value: number;
        offset: number;
    };
    g: {
        value: number;
        offset: number;
    };
    b: {
        value: number;
        offset: number;
    };
}
declare function useHomeHeroTintPlate(canvas: Ref<HTMLCanvasElement | undefined>, enable: Ref<boolean>, tintPlate: Ref<PlumeThemeHomeHero['tintPlate']>): void;

type IconsData = Record<string, string>;
type IconsDataRef = Ref<IconsData>;
declare const useIconsData: () => IconsDataRef;

interface InternalLink {
    text: string;
    link: string;
}
declare function useInternalLink(): {
    home: vue.ComputedRef<InternalLink>;
    blog: vue.ComputedRef<InternalLink>;
    tags: vue.ComputedRef<InternalLink | undefined>;
    archive: vue.ComputedRef<InternalLink | undefined>;
    categories: vue.ComputedRef<InternalLink | undefined>;
};

declare function useLangs({ removeCurrent, }?: {
    removeCurrent?: boolean | undefined;
}): {
    localeLinks: vue.ComputedRef<{
        text: string | undefined;
        link: string;
    }[]>;
    currentLang: vue.ComputedRef<{
        label: string | undefined;
        link: string;
    }>;
};

declare function useLastUpdated(): {
    datetime: vue.Ref<string, string>;
    isoDatetime: vue.ComputedRef<string | undefined>;
    lastUpdatedText: vue.ComputedRef<string | undefined>;
};

declare function useLink(href: MaybeRefOrGetter<string | undefined>, target?: MaybeRefOrGetter<string | undefined>): {
    isExternal: vue.ComputedRef<boolean>;
    link: vue.ComputedRef<string | undefined>;
};

declare function useNavbarData(): Ref<ResolvedNavItem[]>;
interface UseNavReturn {
    isScreenOpen: Ref<boolean>;
    openScreen: () => void;
    closeScreen: () => void;
    toggleScreen: () => void;
}
declare function useNav(): UseNavReturn;

interface Header {
    /**
     * The level of the header
     *
     * `1` to `6` for `<h1>` to `<h6>`
     */
    level: number;
    /**
     * The title of the header
     */
    title: string;
    /**
     * The slug of the header
     *
     * Typically the `id` attr of the header anchor
     */
    slug: string;
    /**
     * Link of the header
     *
     * Typically using `#${slug}` as the anchor hash
     */
    link: string;
    /**
     * The children of the header
     */
    children: Header[];
}
type MenuItem = Omit<Header, 'slug' | 'children'> & {
    element: HTMLHeadElement;
    children?: MenuItem[];
};
declare const headersSymbol: InjectionKey<Ref<MenuItem[]>>;
declare function setupHeaders(): Ref<MenuItem[]>;
declare function useHeaders(): Ref<MenuItem[]>;
declare function getHeaders(range?: ThemeOutline): MenuItem[];
declare function resolveHeaders(headers: MenuItem[], range?: ThemeOutline): MenuItem[];
declare function useActiveAnchor(container: Ref<HTMLElement | null>, marker: Ref<HTMLElement | null>): void;

declare function useBlogPageData(): {
    isBlogPost: vue.ComputedRef<boolean>;
    isBlogLayout: vue.ComputedRef<boolean>;
};

declare const presetLocales: Record<string, PresetLocale>;
declare function getPresetLocaleData(locale: string, name: keyof PresetLocale): string;

declare function usePrevNext(): {
    prev: vue.ComputedRef<NavItemWithLink | null>;
    next: vue.ComputedRef<NavItemWithLink | null>;
};

type RouteQueryValueRaw = RouteParamValueRaw | string[];
interface ReactiveRouteOptions {
    /**
     * Mode to update the router query, ref is also acceptable
     *
     * @default 'replace'
     */
    mode?: MaybeRef<'replace' | 'push'>;
    /**
     * Route instance, use `useRoute()` if not given
     */
    route?: ReturnType<typeof useRoute>;
    /**
     * Router instance, use `useRouter()` if not given
     */
    router?: ReturnType<typeof useRouter>;
}
interface ReactiveRouteOptionsWithTransform<V, R> extends ReactiveRouteOptions {
    /**
     * Function to transform data before return
     */
    transform?: (val: V) => R;
}
declare function useRouteQuery(name: string): Ref<null | string | string[]>;
declare function useRouteQuery<T extends RouteQueryValueRaw = RouteQueryValueRaw, K = T>(name: string, defaultValue?: MaybeRefOrGetter<T>, options?: ReactiveRouteOptionsWithTransform<T, K>): Ref<K>;

declare function enhanceScrollBehavior(router: Router): void;

interface ScrollPromise {
    wait: () => Promise<void> | null;
    pending: () => void;
    resolve: () => void;
}
declare const useScrollPromise: () => ScrollPromise;

type SidebarData = Record<string, Sidebar>;
type SidebarDataRef = Ref<SidebarData>;
type AutoDirSidebarRef = Ref<SidebarItem[] | {
    link: string;
    items: SidebarItem[];
}>;
type AutoHomeDataRef = Ref<Record<string, string>>;
declare function setupSidebar(): void;
declare function useSidebarData(): Ref<ResolvedSidebarItem[]>;
/**
 * Get the `Sidebar` from sidebar option. This method will ensure to get correct
 * sidebar config from `MultiSideBarConfig` with various path combinations such
 * as matching `guide/` and `/guide/`. If no matching config was found, it will
 * return empty array.
 */
declare function getSidebar(routePath: string, routeLocal: string): ResolvedSidebarItem[];
/**
 * Get or generate sidebar group from the given sidebar items.
 */
declare function getSidebarGroups(sidebar: ResolvedSidebarItem[]): ResolvedSidebarItem[];
/**
 * Check if the given sidebar item contains any active link.
 */
declare function hasActiveLink(path: string, items: ResolvedSidebarItem | ResolvedSidebarItem[]): boolean;
interface SidebarControl {
    collapsed: Ref<boolean>;
    collapsible: ComputedRef<boolean>;
    isLink: ComputedRef<boolean>;
    isActiveLink: Ref<boolean>;
    hasActiveLink: ComputedRef<boolean>;
    hasChildren: ComputedRef<boolean>;
    toggle: () => void;
}
interface UseSidebarReturn {
    isOpen: Ref<boolean>;
    sidebar: Ref<ResolvedSidebarItem[]>;
    sidebarKey: Ref<string>;
    sidebarGroups: Ref<ResolvedSidebarItem[]>;
    hasSidebar: ComputedRef<boolean>;
    hasAside: ComputedRef<boolean>;
    leftAside: ComputedRef<boolean>;
    isSidebarEnabled: ComputedRef<boolean>;
    open: () => void;
    close: () => void;
    toggle: () => void;
}
declare function useSidebar(): UseSidebarReturn;
/**
 * a11y: cache the element that opened the Sidebar (the menu button) then
 * focus that button again when Menu is closed with Escape key.
 */
declare function useCloseSidebarOnEscape(isOpen: Ref<boolean>, close: () => void): void;
declare function useSidebarControl(item: ComputedRef<ResolvedSidebarItem>): SidebarControl;
declare function getSidebarFirstLink(sidebar: ResolvedSidebarItem[]): string;

type TagColors = Record<string, string>;
type TagColorsRef = Ref<TagColors>;
declare const useTagColors: () => TagColorsRef;

declare function setupWatermark(): void;

export { type AutoDirSidebarRef, type AutoHomeDataRef, type BlogCategory, type BlogCategoryItem, type BlogCategoryItemWithPost, type BlogDataRef, type Data, type Encrypt, type EncryptConfig, type EncryptData, type EncryptDataRule, type EncryptRef, EncryptSymbol, type Header, type InternalLink, type MenuItem, type ReactiveRouteOptions, type ReactiveRouteOptionsWithTransform, type RouteQueryValueRaw, type ScrollPromise, type ShortPostItem$1 as ShortPostItem, type SidebarControl, type SidebarData, type SidebarDataRef, type TagColors, type TagColorsRef, type ThemeDataRef, type ThemeLocaleDataRef, type TintPlate, type UseNavReturn, type UseSidebarReturn, blogPostData, darkModeSymbol, encrypt, enhanceScrollBehavior, focusedElement, getHeaders, getPresetLocaleData, getSidebar, getSidebarFirstLink, getSidebarGroups, hasActiveLink, headersSymbol, presetLocales, resolveHeaders, setupDarkMode, setupEncrypt, setupHeaders, setupSidebar, setupThemeData, setupWatermark, themeData, themeLocaleDataSymbol, useActiveAnchor, useArchives, useAside, useBlogCategory, useBlogExtract, useBlogPageData, useBulletin, useBulletinControl, useCloseSidebarOnEscape, useContributors, useDarkMode, useData, useEditLink, useEncrypt, useEncryptCompare, useEncryptData, useFlyout, useHeaders, useHomeHeroTintPlate, useIconsData, useInternalLink, useLangs, useLastUpdated, useLink, useLocalePostList, useNav, useNavbarData, usePostList, usePostListControl, usePrevNext, useRouteQuery, useScrollPromise, useSidebar, useSidebarControl, useSidebarData, useTagColors, useTags, useThemeData, useThemeLocaleData };
