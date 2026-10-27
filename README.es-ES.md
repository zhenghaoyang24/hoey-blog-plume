

## Blog personal

Tema del blog - [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume)

La página de inicio del blog es una página personalizada. Si también estás utilizando este tema de blog y deseas consultar la página de inicio de este blog, consulta la siguiente descripción detallada.

## Descripción de los tipos

Este blog cuenta actualmente con dos tipos de página de inicio personalizadas: `ProfileHome` y `GridHome`.

Una es GridHome, de tipo cuadrícula con varios tipos de tarjetas, y la otra es ProfileHome, que es más sencilla.

- GridHome:
  <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/abc4bc54-2e85-48ef-9078-cd51cac2fe1c" />

Se puede alternar entre estos dos métodos editando el `README.md`:

```md
---
pageLayout: home
config:
  - type: 类别
---
```

## Configuración

### GridHome

1. El código de los componentes se encuentra en todos los archivos `.vue` dentro de `docs/.vuepress/theme/components/gridhome`.

2. En `docs/.vuepress/client.js`, importa `GridHome.vue`:

```js
import GridHome from "./theme/components/gridhome/GridHome.vue";
export default defineClientConfig({
  enhance({ app }) {
    app.component("GridHome", GridHome);
  },
});
```

3. Modifica la configuración de la página de inicio en `docs/README.md`:

```markdown
---
pageLayout: home
externalLinkIcon: false
config:
  - type: GridHome
---
```

4. Los gráficos en `AboutMeCharacter.vue` utilizan [echarts.js](https://echarts.apache.org/zh/index.html), por lo que es necesario instalar esta dependencia:

```shell
npm install echarts
```

### Descripción de los componentes

#### `GridHome.vue` es el componente de la página de inicio; el contenido de la página es una combinación de los siguientes componentes de tarjetas.

#### `AboutMeName.vue` es la **tarjeta de presentación** en la página de inicio:

![image](https://github.com/user-attachments/assets/a809cdd3-838c-4218-92f7-b3423153cfbd)

#### `AboutMeSkill.vue` es la **tarjeta de habilidades** en la página de inicio:

Puedes modificar los arrays `technology` y `tools` en el `script` de `AboutMeSkill.vue` para cambiar el contenido de la tarjeta. El campo `type` contiene un valor, y `icon` es el **Icon name** de [iconify](https://icon-sets.iconify.design/).

![image](https://github.com/user-attachments/assets/53e8d05f-4d83-4fe0-a603-f4968834f51b)

#### `AboutMeCharacter.vue` es la **tarjeta de personalidad** en la página de inicio:

![image](https://github.com/user-attachments/assets/2a57a3f8-9afd-4e98-a777-e5842cecce53)

#### `AboutMeLife.vue` es la **tarjeta de vida diaria** en la página de inicio:

![image](https://github.com/user-attachments/assets/f8bf49f4-8a5b-424f-b551-20858296f316)

#### `AboutMeFriendLink.vue` es la **tarjeta de enlaces de amigos** en la página de inicio:

Si tienes muchos enlaces de amigos, puedes guardar la información de los enlaces en un archivo como `docs/.vuepress/theme/data/friends.json`,
y luego importarlo en el `script` de `AboutMeFriendLink.vue`.

La ruta de redirección hacia la página de enlaces de amigos en el botón **Todos los amigos** de la esquina superior derecha de la tarjeta se puede modificar en `AboutMeFriendLink.vue` dentro de `<router-link to="（相对路径）">`.

Si también deseas personalizar la página de enlaces de amigos, puedes consultar `docs/notes/more/friends.md` e importar `AllFriendContent.vue` en `client.js`.

![image](https://github.com/user-attachments/assets/7a1207f0-ff82-4fba-beb4-f87ce7e6f4a7)

#### `AboutMeText.vue` es la **tarjeta de texto** en la página de inicio:

La tarjeta de texto utiliza una ranura (slot), por lo que puedes personalizar su contenido en `GridHome.vue` para satisfacer diversas necesidades de texto.

![image](https://github.com/user-attachments/assets/d69ec01a-9012-46c4-9f60-5665c5387432)

![image](https://github.com/user-attachments/assets/615c4be7-dc1d-4c16-84b4-2b87e8a9b2d9)

### Ancho personalizado de las tarjetas

El ancho de la tarjeta se modifica aplicando una `class` al `div` padre del componente de la tarjeta. `grid-row-1` hace que una tarjeta ocupe toda la fila, `grid-row-1-1` dispone dos tarjetas en una fila con una proporción 1:1, y `grid-row-3-2` las dispone con una proporción 3:2. Puedes escribir más disposiciones en el `style` de `Custom.vue` para combinar las tarjetas libremente.

## Licencia

Este tema de blog utiliza el tema de código abierto [vuepress-theme-plume](https://theme-plume.vuejs.press/), sujeto a la licencia MIT.

Gracias a [pengzhanbo](https://github.com/pengzhanbo) por crear un excelente tema de código abierto, y a todos los colaboradores.
