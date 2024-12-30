<template><div><div class="vp-file-tree"><ul>
<FileTreeItem type="folder" :expanded="true" :empty="false"><span class="tree-node folder"><VPIcon name="vscode-icons:folder-type-src"></VPIcon><span class="name">src</span></span>
<ul>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">App.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-typescript"></VPIcon><span class="name">main.ts</span></span></FileTreeItem>
<FileTreeItem type="folder" :expanded="true" :empty="false"><span class="tree-node folder"><VPIcon name="vscode-icons:folder-type-view"></VPIcon><span class="name">views</span></span>
<ul>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">HomeView.vue</span></span></FileTreeItem>
</ul>
</FileTreeItem>
<FileTreeItem type="folder" :expanded="true" :empty="false"><span class="tree-node folder"><VPIcon name="vscode-icons:default-folder"></VPIcon><span class="name">stores</span></span>
<ul>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-typescript"></VPIcon><span class="name">repos.ts</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-typescript"></VPIcon><span class="name">user.ts</span></span></FileTreeItem>
</ul>
</FileTreeItem>
<FileTreeItem type="folder" :expanded="true" :empty="false"><span class="tree-node folder"><VPIcon name="vscode-icons:default-folder"></VPIcon><span class="name">router</span></span>
<ul>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-typescript"></VPIcon><span class="name">index.ts</span></span></FileTreeItem>
</ul>
</FileTreeItem>
<FileTreeItem type="folder" :expanded="true" :empty="false"><span class="tree-node folder"><VPIcon name="vscode-icons:folder-type-db"></VPIcon><span class="name">data</span></span>
<ul>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-json"></VPIcon><span class="name">category.json</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-typescript"></VPIcon><span class="name">LanguageColors.ts</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-json"></VPIcon><span class="name">repos.json</span></span></FileTreeItem>
</ul>
</FileTreeItem>
<FileTreeItem type="folder" :expanded="true" :empty="false"><span class="tree-node folder"><VPIcon name="vscode-icons:folder-type-component"></VPIcon><span class="name">components</span></span>
<ul>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">AsideBar.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">CategoryCatalog.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">CategoryItem.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">CategoryTabs.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">NavBar.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">NewBtn.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">ReposCard.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">SearchInputResult.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">SearchResultBox.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">ThemeChange.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">VerMarker.vue</span></span></FileTreeItem>
<FileTreeItem type="folder" :expanded="true" :empty="false"><span class="tree-node folder"><VPIcon name="vscode-icons:folder-type-images"></VPIcon><span class="name">icons</span></span>
<ul>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">CatalogIcon.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">ClearIcon.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">GithubIcon.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">LikeIcon.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">RefreshIcon.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">ReposIcon.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">SearchIcon.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">StarIcon.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">ThemeMoonIcon.vue</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-vue"></VPIcon><span class="name">ThemeSunIcon.vue</span></span></FileTreeItem>
</ul>
</FileTreeItem>
</ul>
</FileTreeItem>
<FileTreeItem type="folder" :expanded="true" :empty="false"><span class="tree-node folder"><VPIcon name="vscode-icons:folder-type-asset"></VPIcon><span class="name">assets</span></span>
<ul>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-less"></VPIcon><span class="name">base.less</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-svg"></VPIcon><span class="name">logo.svg</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-less"></VPIcon><span class="name">theme.less</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-less"></VPIcon><span class="name">variable.less</span></span></FileTreeItem>
<FileTreeItem type="folder" :expanded="true" :empty="false"><span class="tree-node folder"><VPIcon name="vscode-icons:folder-type-images"></VPIcon><span class="name">icons</span></span>
<ul>
<FileTreeItem type="folder" :expanded="true" :empty="false"><span class="tree-node folder"><VPIcon name="vscode-icons:default-folder"></VPIcon><span class="name">aside-bar</span></span>
<ul>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-image"></VPIcon><span class="name">theme-button-moon.png</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-image"></VPIcon><span class="name">theme-button-son.png</span></span></FileTreeItem>
</ul>
</FileTreeItem>
</ul>
</FileTreeItem>
<FileTreeItem type="folder" :expanded="true" :empty="false"><span class="tree-node folder"><VPIcon name="vscode-icons:folder-type-fonts"></VPIcon><span class="name">font</span></span>
<ul>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-light-font"></VPIcon><span class="name">AmaticSC-Bold.ttf</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-light-font"></VPIcon><span class="name">AmaticSC-Regular.ttf</span></span></FileTreeItem>
<FileTreeItem type="file" :expanded="false" :empty="true"><span class="tree-node file"><VPIcon name="vscode-icons:file-type-light-font"></VPIcon><span class="name">Pacifico-Regular.ttf</span></span></FileTreeItem>
</ul>
</FileTreeItem>
</ul>
</FileTreeItem>
</ul>
</FileTreeItem>
</ul>
</div></div></template>


