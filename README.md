# Laravel Component Jumper

![Installs](https://img.shields.io/visual-studio-marketplace/i/naoray.laravel-goto-components)

![go_to_component](https://user-images.githubusercontent.com/10154100/101707926-88ce8380-3a8c-11eb-9933-afd138ee69b8.gif)

- :rocket: quick jump to components with `CTRL` + `click`
- :mag: visual highlight of component links in `.blade` files
- :sparkles: supports configurable component search paths
- :file_folder: searches in configurable path (default: `/resources/views`)
- :gear: configurable search path via settings.json

## Configuration

You can customize the component search paths in your VS Code settings:

```json
{
  "laravel_component_jumper.searchPath": "/resources/views",
  "laravel_component_jumper.regex": "(?<=<x-)(?!slot)[a-z.-]+"
}
```

### Settings

- `searchPath`: Path to search for components (default: `/resources/views`)
- `regex`: Custom regex for matching component names (default: `(?<=<x-)(?!slot)[a-z.-]+`)
