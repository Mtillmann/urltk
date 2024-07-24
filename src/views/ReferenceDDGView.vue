<script setup>
</script>
<template>
  <p>
    DuckDuckGo's <a href="https://duckduckgo.com/duckduckgo-help-pages/results/syntax/" target="_blank">advanced search
    syntax</a>
    allows you to pass URLs or more commonly search terms to the search engine and either have
    DuckDuckGo redirect you to search results on yet another site (e.g. <a href="https://duckduckgo.com/?q=arnold !imdb"
                                                                           target="_blank">"arnold !imdb"</a>) or
    to directly redirect you to the first search result (e.g.
    <router-link :to="{name:'deref', query:{url:'https://duckduckgo.com/?q=\\arnold imdb'}}" target="_blank">"\arnold
      imdb"
    </router-link>
    )
    by prepending a backslash to your search term.
  </p>
  <p>DuckDuckGo calls the third-party search syntax items bangs and
    there is a <a href="https://duckduckgo.com/bangs" target="_blank">huge, official,
      searchable list</a>
  </p>

  <h4 class="display-8">
    Building the Tasks
  </h4>

  <p>Building a task to search for a string on another site is straight-forward:</p>
  <ol>
    <li>Extract the search term from the URL</li>
    <li>Transform the extracted string a bit using <code>regexp</code></li>
    <li>Build the URL using the transformed string</li>
  </ol>

  <p>
    <router-link :to="{
      name: 'url',
      params: {url: 'https://en.wikipedia.org/wiki/Once_Upon_a_Time_in_the_West'},
      query:{
        actions:'W1tudWxsLDEsIldpa2lwZWRpYSBUbyBJTURiIiwiKiIsW1siZXh0cmFjdF9wYXRoIixbIjEiXV0sWyJyZWdleHAiLFsiXyIsIiAiLCJnIl1dLFsid3JhcCIsWyJodHRwczovL2R1Y2tkdWNrZ28uY29tLz9xPSQxICFpbWRiIix0cnVlXV1dXV0=',
        view:'debug'
      }
    }">Click here to see an example action's debug view
    </router-link>
    . <br>
    <span class="text-muted">Ignore the weird search results on imdb.com</span>
  </p>

  <p>The other use-case is to directly redirect to the first search result on imdb, which works similar to the
    other example but needs a final <code>deref</code> task, to make ddg actually go to the first search result.</p>

  <ol>
    <li>Extract the search term from the URL</li>
    <li>Transform the extracted string a bit using <code>regexp</code></li>
    <li>Build the URL using the transformed string</li>
    <li>Use the <code>deref</code> task to make DuckDuckGo less suspicious</li>
  </ol>

  <p>
    <router-link :to="{
      name: 'url',
      params: {url: 'https://en.wikipedia.org/wiki/Once_Upon_a_Time_in_the_West'},
      query:{
        actions:'W1tudWxsLDEsIldpa2lwZWRpYSB0byBJTURiIGRldGFpbCIsIioiLFtbImV4dHJhY3RfcGF0aCIsWyIxIl1dLFsicmVnZXhwIixbIl8iLCIgIiwiZyJdXSxbIndyYXAiLFsiaHR0cHM6Ly9kdWNrZHVja2dvLmNvbS8/cT1cXCQxIGltZGIiLHRydWVdXSxbImRlcmVmIixbXV1dXV0=',
        view:'debug'
      }
    }">Click here to see an example action's debug view</router-link>.
    Note how I suffixed the <code>$1</code>-placeholder in the <code>wrap</code>-task's argument with " imdb" to hint
    DuckDuckGo to search on imdb.com. You could also use more
    <a href="https://duckduckgo.com/duckduckgo-help-pages/results/syntax/" target="_blank">complex search operators</a>
    to narrow your search results and thereby increase the chance of the first search result being the one you want.
  </p>

  <p>
    You can Import and adapt both examples by clicking the <i class="bi bi-three-dots-vertical"></i>-menu, then the "Import Action" button in the URL view.
  </p>


</template>