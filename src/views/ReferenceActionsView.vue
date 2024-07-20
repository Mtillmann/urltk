<script setup>

</script>
<template>
  <p>
    Action receive a URL as input and run a defined set of tasks on it.
    The final output is displayed and can be opened, copied, shared etc.
  </p>

  <h4 class="display-8">
    URL Filter
  </h4>
  <p>
    Actions can use a URL Filter that determines if they are apply to a given URL.
    If a filter does not match, the action is omitted.
    If no action is applicable, you will be redirected to the home page with a notice.
  </p>

  <p>Filters use a simple syntax:</p>

  <ul>
    <li>an empty string or <code>*</code> will match anything</li>
    <li>any string will will be matched in the given URL. Example: <code>imdb.com</code> would match any URL that
      contains <em>imdb.com</em></li>
    <li>prefixing your filter with <code>re:</code> will match the given <em>Regexp</em> against the URL. Example:
      <code>re:^https:\/\/[w.]*imdb.com</code> would match any URL that starts with <em>https://imdb.com</em> or any
      subdomain of imdb.com.
    </li>
  </ul>

  <h4 class="display-8">
    Tasks
  </h4>

  <p>
    Tasks are the building blocks of actions.
    They receive an input, process it and return an output.
    The output of each task is passed to the next task in the sequence.
    When all tasks are completed, the final output is displayed.
    If any task fails, the action is aborted and an error message is displayed.
  </p>

  <p>
    See the <router-link :to="{name: 'referenceTasks'}">Tasks documentation</router-link> for
    a list of available tasks and their descriptions.
  </p>

  <h4 class="display-8">
    Sharing Actions
  </h4>
  <p>
    Actions can be shared either from the <router-link :to="{name: 'actions'}">Actions</router-link> page or by
    clicking the three dots on the right side of the action card on the URL landing page.
  </p>
  <p>
    Shared actions are embedded in the URL and the recipient
    can import the action to their own instance of URLtk.
  </p>

  <h4 class="display-8">
    Bookmarklets
  </h4>
  <p>
    You can create a bookmarklet for any action by clicking the bookmarklet-button in the action view.
    You can also create bookmarklets for multiple actions and thereby create custom
    URL landing pages.</p>
  <p>
    Actions in bookmarklets are contained in the URL therefore are synced between devices
    if your browser is set up to sync bookmarks.
  </p>


</template>