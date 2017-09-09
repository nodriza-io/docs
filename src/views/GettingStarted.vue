<template>
  <div class="animated fadeIn">
    <!-- <div class="row"> -->
<!-- 
      <PageTitle>
        <template slot="description">
          Integrating third party apps with Nodriza will potentially extend the platform capabilities. Please take a minute to learn how each app can help your organization, partners and clients to be more productive.
        </template>
      </PageTitle> -->

      <div class="jumbotron bg-gray-dark text-white p-0">
        <h1 class="m-l-40 m-b-0 p-b-0">
        <img class="logo-jumbotron m-r-30" src="https://s3.amazonaws.com/nodriza-io/assets/img/logos/nodriza-logo-color.svg">{{ $route.name | unCammel }}</h1>
      </div>

      <div class="row marketing">
        <div class="col-lg-6">
          <h4>Directory</h4>
          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

          <h4>Cloud Commerce</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

          <h4>Cloud Management</h4>
          <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        </div>

        <div class="col-lg-6">
          <h4>Cloud Billing</h4>
          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

          <h4>Customer Service</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

          <h4>Developers</h4>
          <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        </div>
      </div>

      

    </div><!--/.row-->
  <!-- </div> -->
</template>

<script>
import PageTitle from '../components/PageTitle'
export default {
  name: 'GettingStarted',
  components: {
    PageTitle
  },
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>
.logo-jumbotron {
  height: 200px;
}
</style>
