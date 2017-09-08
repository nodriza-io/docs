<template>
  <div class="animated fadeIn">
    <!-- <div class="row"> -->

      <PageTitle>
        <template slot="description">
          Integrating third party apps with Nodriza will potentially extend the platform capabilities. Please take a minute to learn how each app can help your organization, partners and clients to be more productive.
        </template>
      </PageTitle>

    </div><!--/.row-->
  <!-- </div> -->
</template>

<script>
import PageTitle from '../components/PageTitle'
export default {
  name: 'QuickStart',
  components: {
    PageTitle
  },
  data: function () {
    return {
    }
  }
}
</script>
