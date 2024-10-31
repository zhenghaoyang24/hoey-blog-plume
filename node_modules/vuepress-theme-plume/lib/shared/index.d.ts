import { Stats } from 'node:fs';
import { WatermarkPluginFrontmatter, WatermarkPluginOptions } from '@vuepress/plugin-watermark';
import { PageFrontmatter, Page } from 'vuepress';
import { GitPluginPageData } from '@vuepress/plugin-git';
import { LocaleConfig } from 'vuepress/shared';
import { LocaleData } from 'vuepress/core';
import { CommentPluginOptions } from '@vuepress/plugin-comment';
import { DocSearchOptions } from '@vuepress/plugin-docsearch';
import { MarkdownImagePluginOptions } from '@vuepress/plugin-markdown-image';
import { MarkdownMathPluginOptions } from '@vuepress/plugin-markdown-math';
import { ReadingTimePluginOptions } from '@vuepress/plugin-reading-time';
import { SearchPluginOptions } from '@vuepress-plume/plugin-search';
import { ShikiPluginOptions } from '@vuepress-plume/plugin-shikiji';
import { MarkdownEnhancePluginOptions } from 'vuepress-plugin-md-enhance';
import { MarkdownPowerPluginOptions } from 'vuepress-plugin-md-power';

type ThemeImage = string | {
    src: string;
    alt?: string;
} | {
    dark: string;
    light: string;
    alt?: string;
};
type ThemeIcon = string | {
    svg: string;
};
type ThemeColor = string | {
    light: string;
    dark: string;
};
type ThemeOutline = false | number | [number, number] | 'deep';
interface SocialLink {
    icon: SocialLinkIcon;
    link: string;
    ariaLabel?: string;
}
type SocialLinkIconUnion = 'discord' | 'facebook' | 'github' | 'instagram' | 'linkedin' | 'mastodon' | 'npm' | 'slack' | 'twitter' | 'x' | 'youtube' | 'qq' | 'weibo' | 'bilibili' | 'gitlab' | 'docker' | 'juejin' | 'zhihu' | 'douban' | 'steam' | 'stackoverflow' | 'xbox';
type SocialLinkIcon = SocialLinkIconUnion | {
    svg: string;
    name?: string;
};
interface PresetLocale {
    home: string;
    blog: string;
    tag: string;
    archive: string;
    category: string;
}
interface ThemeTransition {
    /**
     * 是否启用 页面间跳转过渡动画
     * @default true
     */
    page?: boolean;
    /**
     * 是否启用 博客文章列表过渡动画
     * @default true
     */
    postList?: boolean;
    /**
     * 是否启用 深色/浅色 模式切换过渡动画
     * @default true
     */
    appearance?: boolean;
}

type NavItem = string | NavItemWithLink | NavItemWithChildren;
interface NavItemWithLink {
    /**
     * 导航文本
     */
    text: string;
    /**
     * 导航链接
     */
    link: string;
    /**
     * 导航图标
     */
    icon?: ThemeIcon;
    prefix?: never;
    items?: never;
    /**
     * `activeMatch` is expected to be a regex string. We can't use actual
     * RegExp object here because it isn't serializable
     */
    activeMatch?: string;
    rel?: string;
    target?: string;
    noIcon?: boolean;
}
interface NavItemChildren {
    /**
     * 下拉菜单的文本
     */
    text?: string;
    /**
     *
     * 当前分组的页面前缀
     */
    prefix?: string;
    /**
     * 导航图标
     */
    icon?: ThemeIcon;
    /**
     * 导航栏下拉菜单
     */
    items: (string | NavItemWithLink)[];
}
interface NavItemWithChildren {
    text?: string;
    /**
     * 当前分组的页面前缀
     */
    prefix?: string;
    /**
     * 导航图标
     */
    icon?: ThemeIcon;
    /**
     * 导航栏下拉菜单
     */
    items: (string | NavItemChildren | NavItemWithLink)[];
    /**
     * `activeMatch` is expected to be a regex string. We can't use actual
     * RegExp object here because it isn't serializable
     *
     * `activeMatch` 应为正则表达式字符串，但必须将其定义为字符串。
     * 我们不能在这里使用实际的 RegExp 对象，因为它在构建期间不可序列化。
     */
    activeMatch?: string;
}

type PlumeNormalFrontmatter = PageFrontmatter<{
    /**
     * @deprecated
     *
     * 使用 pageLayout = 'home' 代替
     */
    home?: boolean;
    /**
     * @deprecated
     *
     * 使用 pageLayout = 'friends' 代替
     */
    friends?: boolean;
    /**
     * page layout
     */
    pageLayout?: false | 'home' | 'blog' | 'doc' | 'custom' | 'page' | 'friends';
    /**
     * 自定义页面 class
     */
    pageClass?: string;
    /**
     * 是否显示导航栏
     *
     * @default true
     */
    navbar?: boolean;
    /**
     * 是否显示返回顶部按钮
     *
     * @default true
     */
    backToTop?: boolean;
    /**
     * 当前页面是否显示 外部链接图标
     *
     * @default true
     */
    externalLinkIcon?: boolean;
    /**
     * @deprecated 使用 `externalLinkIcon` 代替
     */
    externalLink?: boolean;
}>;

interface PlumeThemePageFrontmatter extends PlumeNormalFrontmatter {
    home?: never;
    friends?: never;
    /**
     * 是否开启评论
     */
    comments?: boolean;
    /**
     * 是否显示编辑按钮
     */
    editLink?: boolean;
    /**
     * 编辑链接模式
     */
    editLinkPattern?: string;
    /**
     * 是否显示最近更新时间
     */
    lastUpdated?: boolean;
    /**
     * 是否显示贡献者
     */
    contributors?: boolean | string | string[];
    /**
     * 上一篇
     */
    prev?: string | NavItemWithLink;
    /**
     * 下一篇
     */
    next?: string | NavItemWithLink;
    /**
     * 是否显示侧边栏，也可以强制指定当前页面显示哪个侧边栏
     */
    sidebar?: string | false;
    /**
     * 是否显示页内侧边栏
     */
    aside?: boolean | 'left';
    /**
     * 是否显示内容大纲，仅在页内侧边栏开启时生效
     */
    outline?: ThemeOutline;
    /**
     * 是否显示阅读时间、字数
     */
    readingTime?: boolean;
    /**
     * 水印配置
     */
    watermark?: WatermarkPluginFrontmatter['watermark'] & {
        fullPage?: boolean;
    };
    /**
     * 用作 navbar 、 sidebar 的图标
     * 支持 iconify 图标，直接使用 iconify name 即可自动加载
     * 支持 本地、远程 svg 图标，直接使用 svg 的 url 即可
     * 或直接传入 svg 字符串
     */
    icon?: string | {
        svg: string;
    };
    /**
     * 标题徽章
     */
    badge?: string | {
        text: string;
        type?: 'info' | 'tip' | 'warning' | 'danger';
    };
}

interface AutoFrontmatterMarkdownFile {
    filepath: string;
    relativePath: string;
    content: string;
    createTime: Date;
    stats: Stats;
}
type FrontmatterFn<T = any> = (value: T, file: AutoFrontmatterMarkdownFile, data: PlumeThemePageFrontmatter) => T | PromiseLike<T>;
type AutoFrontmatterObject<T = any> = Record<string, FrontmatterFn<T>>;
type AutoFrontmatterArray = {
    include: string | string[];
    frontmatter: AutoFrontmatterObject;
}[];
interface AutoFrontmatter {
    /**
     * glob 匹配，被匹配的文件将会自动生成 frontmatter
     *
     * @default ['**\/*.md']
     */
    include?: string | string[];
    /**
     * glob 匹配，被匹配的文件将不会自动生成 frontmatter
     */
    exclude?: string | string[];
    /**
     * 是否自动生成 permalink
     *
     * @default true
     */
    permalink?: boolean;
    /**
     * 是否自动生成 createTime
     *
     * 默认读取 文件创建时间，`createTitme` 比 vuepress 默认的 `date` 时间更精准到秒
     */
    createTime?: boolean;
    /**
     * 是否自动生成 author
     *
     * 默认读取 `profile.name` 或 `package.json` 的 `author`
     *
     * @deprecated 不再默认生成 `author`, 该配置已废弃
     */
    author?: boolean;
    /**
     * 是否自动生成 title
     *
     * 默认读取文件名作为标题
     */
    title?: boolean;
    /**
     * {
     *    key(value, file, data) {
     *      return value
     *    }
     * }
     */
    frontmatter?: AutoFrontmatterArray | AutoFrontmatterObject;
}

interface ReadingTime {
    /** 分钟数 */
    minutes: number;
    /** 字数 */
    words: number;
}
interface PlumeThemePageData extends GitPluginPageData {
    type: 'blog' | 'friends' | 'blog-tags' | 'blog-archives' | 'blog-categories';
    categoryList?: PageCategoryData[];
    filePathRelative: string | null;
    readingTime?: ReadingTime;
    bulletin?: boolean;
}
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
type PlumeThemeBlogPostData = PlumeThemeBlogPostItem[];
interface PlumeThemeBlog {
    /**
     * 通过 glob string 配置包含文件，
     *
     * 默认读取 源目录中的所有 `.md` 文件，但会排除 `notes` 配置中用于笔记的目录。
     *
     * 如果希望只将某个目录下的文章读取为博客文章，比如 `blog` 目录，可以配置为：
     * `['blog/**\/*.md']`
     *
     * @default - ['**\/*.md']
     */
    include?: string[];
    /**
     * 通过 glob string 配置排除的文件
     *
     *  _README.md 文件一般作为主页或者某个目录下的主页，不应该被读取为 blog文章_
     *
     * @default - ['.vuepress/', 'node_modules/', '{README,index}.md']
     */
    exclude?: string[];
    /**
     * 分页
     */
    pagination?: false | number | {
        /**
         * 每页显示的文章数量
         * @default 15
         */
        perPage?: number;
    };
    /**
     * 博客文章列表页链接
     *
     * @default '/blog/'
     */
    link?: string;
    /**
     * 是否启用博客文章列表
     * @default true
     */
    postList?: boolean;
    /**
     * 是否启用标签页
     * @default true
     */
    tags?: boolean;
    /**
     * 自定义标签页链接
     *
     * @default '/blog/tags/'
     */
    tagsLink?: string;
    /**
     * 标签颜色主题
     *
     * @default 'colored'
     */
    tagsTheme?: 'colored' | 'gray' | 'brand';
    /**
     * 是否启用归档页
     * @default true
     */
    archives?: boolean;
    /**
     * 自定义归档页链接
     *
     * @default '/blog/archives/'
     */
    archivesLink?: string;
    /**
     * 是否启用分类页
     * @default true
     */
    categories?: boolean;
    /**
     * 自定义分类页链接
     *
     * @default '/blog/categories/'
     */
    categoriesLink?: string;
    /**
     * 分类页展开深度
     *
     * @default 'deep'
     */
    categoriesExpand?: number | 'deep';
    /**
     * 博客文章封面图
     *
     * 配置封面图的位置，支持 `'left'`、`'right'`、`'top'`、`'top-inside'`
     *
     * @default 'right'
     */
    postCover?: BlogPostCoverLayout | Omit<BlogPostCover, 'url'>;
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

interface FriendsItem {
    name: string;
    link: string;
    avatar?: string;
    desc?: string;
    socials?: SocialLink[];
    backgroundColor?: string | {
        light: string;
        dark: string;
    };
    color?: string | {
        light: string;
        dark: string;
    };
    nameColor?: string | {
        light: string;
        dark: string;
    };
}
interface FriendGroup {
    title?: string;
    desc?: string;
    list?: FriendsItem[];
}
interface PlumeThemeFriendsFrontmatter extends PlumeNormalFrontmatter {
    friends: boolean;
    title?: string;
    description?: string;
    list?: FriendsItem[];
    groups?: FriendGroup[];
}

interface PlumeThemeHomeFrontmatter extends PlumeNormalFrontmatter, Omit<PlumeThemeHomeBanner, 'type'> {
    home?: true;
    friends?: never;
    config?: PlumeThemeHomeConfig[];
}
type PlumeThemeHomeConfig = PlumeThemeHomeBanner | PlumeThemeHomeTextImage | PlumeThemeHomeFeatures | PlumeThemeHomeProfile;
interface PlumeThemeHero {
    name: string;
    tagline?: string;
    text?: string;
    actions: PlumeThemeHeroAction[];
}
interface PlumeThemeHeroAction {
    theme?: 'brand' | 'alt';
    text: string;
    link?: string;
    target?: string;
    rel?: string;
}
interface PlumeHomeConfigBase {
    type: 'banner' | 'hero' | 'text-image' | 'image-text' | 'features' | 'profile' | 'custom';
    full?: boolean;
    backgroundImage?: string | {
        light: string;
        dark: string;
    };
    backgroundAttachment?: 'fixed' | 'local';
    onlyOnce?: boolean;
}
interface PlumeThemeHomeBanner extends Pick<PlumeHomeConfigBase, 'type' | 'onlyOnce' | 'full'> {
    type: 'banner';
    banner?: string;
    bannerMask?: number | {
        light?: number;
        dark?: number;
    };
    hero: PlumeThemeHero;
}
interface PlumeThemeHomeHeroTintPlate {
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
interface PlumeThemeHomeHero extends PlumeHomeConfigBase {
    type: 'hero';
    hero: PlumeThemeHero;
    full?: boolean;
    background?: 'tint-plate' | (string & {
        zz_IGNORE?: never;
    });
    tintPlate?: string | number | {
        light?: string | number;
        dark?: string | number;
    } | PlumeThemeHomeHeroTintPlate | {
        light?: PlumeThemeHomeHeroTintPlate;
        dark?: PlumeThemeHomeHeroTintPlate;
    };
    filter?: string;
}
interface PlumeThemeHomeTextImage extends PlumeHomeConfigBase {
    type: 'text-image' | 'image-text';
    image: ThemeImage;
    width?: number | string;
    title?: string;
    description?: string;
    list: (string | {
        title?: string;
        description?: string;
    })[];
}
interface PlumeThemeHomeFeatures extends PlumeHomeConfigBase {
    type: 'features';
    title?: string;
    description?: string;
    features: PlumeThemeHomeFeature[];
}
interface PlumeThemeHomeFeature {
    icon?: FeatureIcon;
    title: string;
    details?: string;
    link?: string;
    linkText?: string;
    rel?: string;
    target?: string;
}
type FeatureIcon = string | {
    src: string;
    alt?: string;
    width?: string;
    height?: string;
    wrap?: boolean;
} | {
    light: string;
    dark: string;
    alt?: string;
    width?: string;
    height?: string;
    wrap?: boolean;
};
interface PlumeThemeHomeProfile extends PlumeHomeConfigBase {
    type: 'profile';
    name?: string;
    description?: string;
    avatar?: ThemeImage;
    circle?: boolean;
}
interface PlumeThemeHomeCustom extends PlumeHomeConfigBase {
    type: 'custom';
}

interface PlumeThemePostFrontmatter extends PlumeThemePageFrontmatter {
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 文章标签
     */
    tags?: string[];
    /**
     * 是否置顶
     */
    sticky?: boolean | number;
    /**
     * @deprecated 使用 `draft` 代替
     */
    article?: boolean;
    /**
     * 标记当前文章是否为草稿状态，
     * 草稿状态下的文章不会出现在博客列表中
     *
     * @default false
     */
    draft?: boolean;
    /**
     * 文章封面图
     */
    cover?: string | BlogPostCover;
    /**
     * 是否展示文章摘要，传入 string 时为自定义摘要，此时 `<!-- more -->` 无效
     */
    excerpt?: boolean | string;
}

type Sidebar = 'auto' | (string | SidebarItem)[] | SidebarMulti;
type SidebarMulti = Record<string, 'auto' | (string | SidebarItem)[] | {
    items: 'auto' | (string | SidebarItem)[];
    prefix?: string;
}>;
interface SidebarItem {
    /**
     * 侧边栏文本
     */
    text?: string;
    /**
     * 侧边栏链接
     */
    link?: string;
    /**
     * 侧边栏图标
     */
    icon?: ThemeIcon;
    /**
     * 次级侧边栏分组
     */
    items?: 'auto' | (string | SidebarItem)[];
    /**
     * 如果未指定，组不可折叠。
     *
     * 如果为`true`，组可折叠，并默认折叠。
     *
     * 如果为`false`，组可折叠，但默认展开。
     */
    collapsed?: boolean;
    /**
     * 当前分组的链接前缀
     */
    prefix?: string;
    /**
     * @deprecated 使用 `prefix` 替代
     */
    dir?: string;
    rel?: string;
    target?: string;
}

interface NotesOptions {
    /**
     * 保存所有笔记的目录
     * @default '/notes/'
     */
    dir: string;
    /**
     * 所有笔记的默认链接前缀
     * @default '/'
     */
    link: string;
    /**
     * 笔记配置
     */
    notes: NoteItem[];
}
interface NoteItem {
    /**
     * 保存笔记的目录
     */
    dir: string;
    /**
     * 当前笔记的链接前缀，将会与 `notes.link` 合并
     */
    link: string;
    /**
     * 当前笔记名称
     */
    text?: string;
    /**
     * 当前笔记的侧边栏配置
     */
    sidebar?: 'auto' | (string | SidebarItem)[];
}

interface PlumeThemeEncrypt {
    /**
     * 是否启用全站加密
     * @default false
     */
    global?: boolean;
    /**
     * 超级权限密码, 该密码可以解密全站，以及任意加密的文章
     *
     */
    admin?: string | string[];
    /**
     * 文章密码， 可以通过 文章的 markdown 文件相对路径、页面访问路径、
     * 目录路径 等，对 单个文章 或者 整个目录 进行 加密。
     * 如果是以 `^` 开头，则被认为是类似于正则表达式进行匹配。
     *
     * @example
     * ```json
     * {
     *   "前端/基础/html.md": "123",
     *   "/article/23c44c/": ["456", "789"],
     *   "^/note/(note1|note2)/": "123"
     * }
     * ```
     */
    rules?: {
        [key: string]: string | string[];
    };
}

interface BulletinOptions {
    /**
     * 公告位置
     * @default 'top-right'
     */
    layout?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    /**
     * 是否显示渐变边框
     *
     * @default true
     */
    border?: boolean;
    /**
     * 在哪些页面显示公告
     *
     * - `true` 表示所有页面
     * - `false` 表示不显示
     * - 传入一个函数，返回 `true` 时显示
     */
    enablePage?: boolean | ((page: Page) => boolean);
    /**
     * 公告持续时间
     *
     * @default 'always'
     *
     * - `'session'` 表示在会话周期内关闭公告后不再显示，在新的会话周期重新显示，刷新页面不会重新显示
     * - `'always'` 表示总是显示，关闭公告后刷新页面会重新显示
     * - `'once'` 表示在仅在当前周期内显示，关闭公告后不再显示，新的会话和刷新页面都不会重新显示
     */
    lifetime?: 'session' | 'always' | 'once';
    /**
     * 公告 ID
     *
     * 公告持续时间 需要根据 `id` 作为唯一标识
     */
    id?: string;
    /**
     * 公告标题
     */
    title?: string;
    /**
     * 公告内容
     *
     * 可以使用 markdown 语法 或者 使用 html 文本，
     * 使用 markdown 时需要声明 `contentType` 为 `markdown`
     */
    content?: string;
    /**
     * 公告内容 类型
     *
     * - `markdown` 表示使用 markdown 语法
     * - `text` 表示使用 普通文本 （可以是 html 内容）
     *
     * @default 'text'
     */
    contentType?: 'markdown' | 'text';
    /**
     * 传入一个 `markdown` 或 `html` 文件路径，并使用文件内容作为公告内容
     *
     * - 使用 `.md` 文件时，将会解析 markdown 语法
     * - 使用 `.html` 文件时，只能包含公告内容，请不要使用 `<html>` `<body>` `<script>` 等标签。
     */
    contentFile?: string;
    [key: string]: any;
}

interface PlumeThemeLocaleData extends LocaleData {
    /**
     * 网站站点首页
     */
    home?: string;
    /**
     * 网站站点logo
     */
    logo?: string;
    /**
     * 深色模式下的网站站点logo
     */
    logoDark?: string;
    /**
     * 是否启用深色模式切换按钮
     */
    appearance?: boolean | 'dark' | 'force-dark';
    /**
     * 深色模式切换按钮的文本
     */
    appearanceText?: string;
    lightModeSwitchTitle?: string;
    darkModeSwitchTitle?: string;
    /**
     * @deprecated 弃用，使用 `profile` 代替
     */
    avatar?: PlumeThemeProfile;
    /**
     * 配置博主拥有者 个人资料
     *
     * 显示在博客右侧侧边栏
     */
    profile?: PlumeThemeProfile;
    /**
     * 社交账号配置
     */
    social?: SocialLink[];
    /**
     * 导航栏配置
     *
     * 设置为 `false` 将会禁用导航栏
     */
    navbar?: false | NavItem[];
    /**
     * 允许显示在导航栏的社交类型
     * @default - ['github', 'twitter', 'discord', 'facebook']
     */
    navbarSocialInclude?: (SocialLinkIconUnion | (string & {
        zz_IGNORE_ME?: never;
    }))[];
    /**
     * 博客配置
     */
    blog?: false | PlumeThemeBlog;
    /**
     * 文章链接前缀
     *
     * @default '/article/'
     */
    article?: string;
    /**
     * 笔记配置， 笔记中的文章默认不会出现在首页文章列表
     *
     * 注：也可以将notes配置到navbar中
     */
    notes?: false | NotesOptions;
    /**
     * 侧边栏配置
     */
    sidebar?: SidebarMulti;
    /**
     * 要显示的标题级别。
     *
     * 单个数字表示只显示该级别的标题。
     *
     * 如果传递的是一个元组，第一个数字是最小级别，第二个数字是最大级别。
     *
     * 'deep' 与 [2, 6] 相同，将显示从 <h2> 到 <h6> 的所有标题。
     *
     * @default [2, 3]
     */
    outline?: ThemeOutline;
    /**
     * 是否显示侧边栏
     *
     * - `false` 表示禁用 右侧边栏
     * - `true` 表示启用 右侧边栏
     * - `'left` 表示将有侧边栏移动到文章内容左侧，sidebar 右侧
     *
     * @default true
     */
    aside?: boolean | 'left';
    /**
     * 配置公告
     */
    bulletin?: true | BulletinOptions;
    /**
     * 是否启用过渡动画效果
     *
     * @default true
     */
    transition?: boolean | ThemeTransition;
    /**
     * 选择语言菜单 的文本。
     */
    selectLanguageText?: string;
    /**
     * 选择语言菜单 的 `aria-label` 属性。
     */
    selectLanguageAriaLabel?: string;
    /**
     * 语言名称
     *
     * 仅能在主题配置的 locales 的内部生效 。它将被用作 locale 的语言名称，展示在 选择语言菜单 内。
     */
    selectLanguageName?: string;
    /**
     * 是否显示 "编辑此页"
     *
     * @default true
     */
    editLink?: boolean;
    /**
     * "编辑此页" 的文本
     *
     * @default "Edit this page"
     */
    editLinkText?: string;
    /**
     * "编辑此页" 的链接匹配模式
     *
     * @example ':repo/edit/:branch/:path'
     */
    editLinkPattern?: string;
    /**
     * 文档仓库配置, 用于生成 Edit this page 链接
     */
    docsRepo?: string;
    /**
     * 文档仓库分支配置，用于生成 `Edit this page` 链接。
     */
    docsBranch?: string;
    /**
     * 文档仓库目录配置，用于生成 `Edit this page` 链接。
     */
    docsDir?: string;
    /**
     * 最后更新时间
     *
     * @default { text: 'Last Updated', formatOptions: { dateStyle: 'short', timeStyle: 'short' } }
     */
    lastUpdated?: false | LastUpdatedOptions;
    /**
     * @deprecated 使用 `lastUpdated.text` 代替.
     *
     * "最后更新时间" 的文本
     *
     * @default 'Last updated'
     */
    lastUpdatedText?: string;
    /**
     * 是否显示贡献者
     */
    contributors?: boolean;
    /**
     * 贡献者的文本
     */
    contributorsText?: string;
    /**
     * 移动设备下的导航栏中 菜单选项的文字。
     *
     * @default 'Menu'
     */
    sidebarMenuLabel?: string;
    /**
     * 移动设备下的导航栏中返回顶部的文字。
     *
     * @default 'return to top'
     */
    returnToTopLabel?: string;
    /**
     * 侧边栏 outline 文本
     *
     * @default 'On this page'
     */
    outlineLabel?: string;
    /**
     * 是否显示上一页
     *
     * @default true
     */
    prevPage?: boolean;
    /**
     * 上一页的文本
     *
     * @default 'Previous Page'
     */
    prevPageLabel?: string;
    /**
     * 是否显示下一页
     *
     * @default true
     */
    nextPage?: boolean;
    /**
     * 下一页的文本
     *
     * @default 'Next Page'
     */
    nextPageLabel?: string;
    /**
     * 是否显示外部链接图标
     *
     * @default true
     */
    externalLinkIcon?: boolean;
    /**
     * 是否在文章页显示创建时间
     *
     * @default true
     */
    createTime?: boolean | 'only-blog';
    /**
     * 页脚配置
     */
    footer?: false | {
        message?: string;
        copyright?: string;
    };
    /**
     * 404 页面配置
     */
    notFound?: {
        code?: string | number;
        title?: string;
        quote?: string;
        linkLabel?: string;
        linkText?: string;
    };
    /**
     * 全站加密时的提示
     */
    encryptGlobalText?: string;
    /**
     * 文章加密时的提示
     */
    encryptPageText?: string;
    /**
     * 加密确认按钮文本
     */
    encryptButtonText?: string;
    /**
     * 加密时输入框的 placeholder
     */
    encryptPlaceholder?: string;
}
/** =========================== Profile ================================ */
/**
 * 个人资料
 */
interface PlumeThemeProfile {
    /**
     * @deprecated 弃用，使用 `avatar` 代替
     * 头像链接
     */
    url?: string;
    /**
     * 头像链接地址
     */
    avatar?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 是否显示为圆形头像
     */
    circle?: boolean;
    /**
     * 地理位置
     */
    location?: string;
    /**
     * 组织，公司
     */
    organization?: string;
    /**
     * 布局位置，左侧或者右侧
     * @default 'right'
     */
    layout?: 'left' | 'right';
}
/** ========================== Page Meta ====================== */
interface LastUpdatedOptions {
    /**
     * Set custom last updated text.
     *
     * @default 'Last updated'
     */
    text?: string;
    /**
     * Set options for last updated time formatting.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options
     *
     * @default
     * { dateStyle: 'short', timeStyle: 'short' }
     */
    formatOptions?: Intl.DateTimeFormatOptions & {
        forceLocale?: boolean;
    };
}

interface PlumeThemePluginOptions {
    /**
     * plugin-search 配置
     */
    search?: false | Partial<SearchPluginOptions>;
    /**
     * plugin-docsearch 配置
     */
    docsearch?: false | DocSearchOptions;
    /**
     * 代码高亮 配置
     */
    shiki?: false | ShikiPluginOptions;
    /**
     * git 插件 配置
     */
    git?: boolean;
    nprogress?: false;
    photoSwipe?: false;
    /**
     * 是否启用 `vuepress-plugin-md-enhance` 插件
     *
     * - `hint`, `alert` 已迁移至 `@vuepress/plugin-markdown-hint`, 且主题内置并默认启用。
     * - `imgSize`, `imgMark`, `imgLazyload`, `figure`, `obsidianImgSize` 已迁移至 `@vuepress/plugin-markdown-image`, 请使用 `plugins.markdownImage` 配置项代替。
     * - `katex`, `mathjax` 已迁移至 `@vuepress/plugin-markdown-math`, 请使用 `plugins.markdownMath` 配置项代替
     */
    markdownEnhance?: false | Omit<MarkdownEnhancePluginOptions, 'hint' | 'alert' | 'imgSize' | 'imgMark' | 'imgLazyload' | 'figure' | 'obsidianImgSize' | 'katex' | 'mathjax'>;
    markdownPower?: false | MarkdownPowerPluginOptions;
    /**
     * 是否启用 `@vuepress/plugin-markdown-image` 插件
     *
     * @default false
     * @see https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html
     */
    markdownImage?: false | MarkdownImagePluginOptions;
    /**
     * 是否启用 `@vuepress/plugin-markdown-math` 插件
     *
     * @default { type: 'katex' }
     * @see https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-math.html
     */
    markdownMath?: false | MarkdownMathPluginOptions;
    comment?: false | CommentPluginOptions;
    sitemap?: false;
    seo?: false;
    /**
     * 阅读时间、字数统计
     */
    readingTime?: false | ReadingTimePluginOptions;
    /**
     * 是否开启 水印
     */
    watermark?: boolean | (WatermarkPluginOptions & {
        fullPage?: boolean;
    });
}

interface PlumeThemeOptions extends PlumeThemeLocaleOptions {
    /**
     * 对主题内部使用的插件进行配置
     * @deprecated 配置项迁移至 `plugins`
     */
    themePlugins?: PlumeThemePluginOptions;
    /**
     * 对主题内部使用的插件进行配置
     */
    plugins?: PlumeThemePluginOptions;
    /**
     * 部署站点域名。
     * 用于生成 sitemap、 seo等。
     *
     */
    hostname?: string;
    /**
     * 是否启用编译缓存
     *
     * @default 'filesystem'
     */
    cache?: false | 'memory' | 'filesystem';
    /**
     * 加密配置
     */
    encrypt?: PlumeThemeEncrypt;
    /**
     * 自定义主题配置文件路径
     */
    configFile?: string;
    /**
     * 自动插入 frontmatter
     */
    autoFrontmatter?: false | Omit<AutoFrontmatter, 'frontmatter'>;
}
type PlumeThemeLocaleOptions = PlumeThemeData;
type PlumeThemeData = PlumeThemeLocaleData & {
    locales?: LocaleConfig<Omit<PlumeThemeLocaleData, 'blog' | 'article'>>;
};

type ResolvedNavItem = ResolvedNavItemWithLink | ResolvedNavItemWithChildren;
interface ResolvedNavItemWithLink {
    text: string;
    link: string;
    icon?: ThemeIcon;
    items?: never;
    /**
     * `activeMatch` is expected to be a regex string. We can't use actual
     * RegExp object here because it isn't serializable
     */
    activeMatch?: string;
    rel?: string;
    target?: string;
    noIcon?: boolean;
}
interface ResolvedNavItemChildren {
    text?: string;
    icon?: ThemeIcon;
    items: ResolvedNavItemWithLink[];
}
interface ResolvedNavItemWithChildren {
    text?: string;
    icon?: ThemeIcon;
    items: (ResolvedNavItemChildren | ResolvedNavItemWithLink)[];
    /**
     * `activeMatch` is expected to be a regex string. We can't use actual
     * RegExp object here because it isn't serializable
     */
    activeMatch?: string;
}

type ResolvedSidebar = ResolvedSidebarItem[] | ResolvedSidebarMulti;
type ResolvedSidebarMulti = Record<string, ResolvedSidebarItem[] | {
    items: ResolvedSidebarItem[];
}>;
interface ResolvedSidebarItem {
    /**
     * 侧边栏文本
     */
    text?: string;
    /**
     * 侧边栏链接
     */
    link?: string;
    /**
     * 侧边栏图标
     */
    icon?: ThemeIcon;
    /**
     * 次级侧边栏分组
     */
    items?: ResolvedSidebarItem[];
    /**
     * 如果未指定，组不可折叠。
     *
     * 如果为`true`，组可折叠，并默认折叠。
     *
     * 如果为`false`，组可折叠，但默认展开。
     */
    collapsed?: boolean;
    /**
     * 当前分组的链接前缀
     */
    prefix?: string;
    /**
     * @deprecated 使用 `prefix` 替代
     */
    dir?: string;
    rel?: string;
    target?: string;
}

type ThemeConfig = PlumeThemeLocaleData & {
    locales?: LocaleConfig<Omit<PlumeThemeLocaleData, 'blog'>>;
    /**
     * 自动插入 frontmatter
     */
    autoFrontmatter?: false | Omit<AutoFrontmatter, 'frontmatter'>;
    /**
     * 站点加密配置
     */
    encrypt?: PlumeThemeEncrypt;
};

export type { AutoFrontmatter, AutoFrontmatterArray, AutoFrontmatterMarkdownFile, AutoFrontmatterObject, BlogPostCover, BlogPostCoverLayout, BulletinOptions, FeatureIcon, FriendGroup, FriendsItem, FrontmatterFn, LastUpdatedOptions, NavItem, NavItemChildren, NavItemWithChildren, NavItemWithLink, NoteItem, NotesOptions, PageCategoryData, PlumeHomeConfigBase, PlumeThemeBlog, PlumeThemeBlogPostData, PlumeThemeBlogPostItem, PlumeThemeData, PlumeThemeEncrypt, PlumeThemeFriendsFrontmatter, PlumeThemeHero, PlumeThemeHeroAction, PlumeThemeHomeBanner, PlumeThemeHomeConfig, PlumeThemeHomeCustom, PlumeThemeHomeFeature, PlumeThemeHomeFeatures, PlumeThemeHomeFrontmatter, PlumeThemeHomeHero, PlumeThemeHomeHeroTintPlate, PlumeThemeHomeProfile, PlumeThemeHomeTextImage, PlumeThemeLocaleData, PlumeThemeLocaleOptions, PlumeThemeOptions, PlumeThemePageData, PlumeThemePageFrontmatter, PlumeThemePluginOptions, PlumeThemePostFrontmatter, PlumeThemeProfile, PresetLocale, ResolvedNavItem, ResolvedNavItemChildren, ResolvedNavItemWithChildren, ResolvedNavItemWithLink, ResolvedSidebar, ResolvedSidebarItem, ResolvedSidebarMulti, Sidebar, SidebarItem, SidebarMulti, SocialLink, SocialLinkIcon, SocialLinkIconUnion, ThemeColor, ThemeConfig, ThemeIcon, ThemeImage, ThemeOutline, ThemeTransition };
