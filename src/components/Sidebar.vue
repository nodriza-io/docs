<template>

<div class="sidebar">
  <nav class="sidebar-nav">
    <div>
      <img class="logo-top" src="https://s3.amazonaws.com/nodriza-io/assets/img/logos/nodriza-logo-color.svg">
    </div>
    <ul class="nav">
      <li class="nav-item">
        <span href="/app/dashboard" class="nav-link router-link-exact-active open active itm-header">USER MANUAL</span>
      </li>


      <li class="nav-item">
        <li class="nav-item nav-dropdown open">
          <div class="category text-uppercase"><i class="fa fa-chevron-down m-r-10"></i> Directory</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item  "><a href="/components/buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Users
              <span class="badge badge-default"></span></a>
            </li>
            <li class="nav-item "><a href="/components/social-buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Companies
              <span class="badge badge-default"></span></a>
            </li>
            <li class="nav-item "><a href="/components/social-buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Departments
              <span class="badge badge-default"></span></a>
            </li>
            <li class="nav-item "><a href="/components/cards" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> AWS Accounts
              <span class="badge badge-default"></span></a>
            </li>
          </ul>
        </li>
      </li>


      <li class="nav-item">
        <li class="nav-item nav-dropdown open">
          <div class="category text-uppercase"><i class="fa fa-chevron-down m-r-10"></i> Cloud Commerce</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item"><a href="/components/buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Leads
              <span class="badge badge-default"></span></a>
            </li>
            <li class="nav-item"><a href="/components/social-buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Quotes
              <span class="badge badge-default"></span></a>
            </li>
            <li class="nav-item"><a href="/components/cards" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Contracts
              <span class="badge badge-default"></span></a>
            </li>
          </ul>
        </li>
      </li>


      <li class="nav-item">
        <li class="nav-item nav-dropdown open">
          <div class="category text-uppercase"><i class="fa fa-chevron-down m-r-10"></i> Cloud Management</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item"><a href="/components/buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Plans
              <span class="badge badge-default"></span></a>
            </li>
            <li class="nav-item"><a href="/components/social-buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Servers
              <span class="badge badge-default"></span></a>
            </li>
            <li class="nav-item"><a href="/components/cards" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Health Checks
              <span class="badge badge-default"></span></a>
            </li>
          </ul>
        </li>
      </li>

      <li class="nav-item">
        <li class="nav-item nav-dropdown open">
          <div class="category text-uppercase"><i class="fa fa-chevron-down m-r-10"></i> Cloud Billing</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item"><a href="/components/buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Reports
              <span class="badge badge-default"></span></a>
            </li>
            <li class="nav-item"><a href="/components/buttons" class="nav-link slim bg-gray-dark" slim bg-gray-dark><i class="fa fa-angle-right"></i> Invoices
              <span class="badge badge-default"></span></a>
            </li>
          </ul>
        </li>
      </li>

      <li class="nav-item">
        <li class="nav-item nav-dropdown open">
          <div class="category text-uppercase"><i class="fa fa-chevron-down m-r-10"></i> Customer Service</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item"><a href="/components/buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Support Center
              <span class="badge badge-default"></span></a>
            </li>
          </ul>
        </li>
      </li>

      <li class="nav-item">
        <li class="nav-item nav-dropdown open">
          <div class="category text-uppercase"><i class="fa fa-chevron-down m-r-10"></i> Developers</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item"><a href="/components/buttons" class="nav-link slim bg-gray-dark"><i class="nf nf-nodriza-circle"></i> Nodriza SDK
              <span class="badge badge-default"></span></a>
            </li>
            <li class="nav-item"><a href="/components/buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> API Explorer
              <span class="badge badge-default"></span></a>
            </li>
          </ul>
        </li>
      </li>

      <li class="nav-item">
        <li class="nav-item nav-dropdown open">
          <div class="category text-uppercase"><i class="fa fa-chevron-down m-r-10"></i> Options</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item"><a href="/app/preferences/panel" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Preferences Panel
              <span class="badge badge-default"></span></a>
            </li>
          </ul>
        </li>
      </li>

    </ul>
    <div></div>
  </nav>
</div>



</template>
<script>
export default {
  name: 'sidebar',
  components: {
  },
  methods: {
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  }
}
</script>

<style lang="css" scoped>
/*  .nav-link {
    cursor: pointer;
  }*/
  .slim {
    padding-top: 8px !important;
    padding-bottom: 8px !important; 
    font-size: 12px;
    padding-left: 11px !important;
  }
  .nav-item {
/*    padding-top: 0 !important;
    padding-bottom: 0 !important; */
  }
  .logo-top {
    margin-left: 73px;
    width: 43px;
  }

  .itm-header {
    font-weight: 600;
    font-size: 14px !important;
    text-align: center;
  }

  .category {
    padding: 10px;
    background: none !important;
    cursor: initial !important;
    font-weight: 600;
    font-size: 12px;
  }

  .category a:hover {
    cursor: default;
  }
</style>
