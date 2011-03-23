# jQuery collapsible

jQuery collapsible provides collapsibility to your tree list.

## How to use?

### HTML structure

    <ul class="tree">
      <li>
        <span class="collapsible-trigger">trigger</span>
        text
        <ul class="collapsible-target">
          <li>text</li>
          <li>text</li>
        </ul>
      </li>
    </ul>

You can force a tree leaf to be open at initial use by adding the css class 
"open" to trigger:

    <span class="collapsible-trigger open">trigger</span>

### Javascript

Put this inside your jQuery DOM ready function:

    $(".tree").collapsible();

## 2 versions?

The only difference between the full & lite version is that the full version
includes a save of the current collapsed state in a cookie when your user 
leaves the page.