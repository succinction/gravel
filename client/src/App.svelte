<script lang="ts">
  import page from 'page'
  import HomePage from './modules/routes/home/pages/HomePage.svelte'
  import AboutPage from './modules/routes/about/pages/AboutPage.svelte'
  import ParadoxPage from './modules/routes/paradox/pages/ParadoxPage.svelte'
  import usersRoutes from './modules/routes/users/routes'
  import Topnav from './modules/layouts/components/Topnav.svelte'
  import NotfoundPage from './modules/layouts/pages/NotfoundPage.svelte'

  let component
  const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/paradox', component: ParadoxPage },
    ...usersRoutes,
    { path: '/*', component: NotfoundPage },
  ]
  routes.forEach(r => page(r.path, () => component = r.component ))

  page.start()

</script>

<Topnav />
<div class="container pt-4">
  <svelte:component this={component} />
</div>