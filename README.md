
## Bootstrap as Web Components

Based on the work of Mike Costello, [Demo](http://mikecostello.github.io/bootstrap-web-components) and
[Repository](https://github.com/MikeCostello/bootstrap-web-components).

The goal of these Bootstrap lookalike web Components as to implement each component as a standalone 
component. Hence no dependencies on jQuery or Bootstrap.

There are oppurtunities for refactoring using common super classes but, as stated, the goal was to
create each each component with no dependencies.

## Example

Web component use both value based attribute and boolean attribute to control styling.

```html
    <div id='progress-bars'>
      <bswc-progress-bar value='10' width=300px>10%</bswc-progress-bar>
      <bswc-progress-bar value='20' info>Moving along</bswc-progress-bar>
      <bswc-progress-bar value='40' success>Half done!</bswc-progress-bar>
      <bswc-progress-bar value='60' warning striped>60 percent completed</bswc-progress-bar>
      <bswc-progress-bar value='80' danger striped animated>80% World domination almost complete!</bswc-progress-bar>
      <bswc-progress-bar value='100' secondary striped animated>D O N E !</bswc-progress-bar>
    </div>
```

## Compatability

Currently, Jan 2020, these web components render correctly with the lastest versions of Chrome, Firefox, Firefox Developer Edition.  All components except ```Breadcrumbs``` render with the lastest macOS version of Safari.  Didn't test on MicroSoft Edge or any versions of IE.

## Live Demo

* [Badges, Buttons, Alerts, Tooktips, Progress Bars, Spinners and Loaders](http://willgilbert.org/Bootstrap-webcomponents/)
* [Cards](http://willgilbert.org/Bootstrap-webcomponents/cards.html)
* [Breadcrumbs](http://willgilbert.org/Bootstrap-webcomponents/breadcrumbs.html)

## Local Demo

If you open each HTML locally running in a web server environment e.g. Visual Studio's **"Live Server"** or node.js' ```live-server```.



