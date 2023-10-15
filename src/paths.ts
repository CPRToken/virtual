

export const paths = {
  index: '/',
  checkout: '/checkout',
  contact: '/contact',
  pricing: '/pricing',
  auth: {


    firebase: {
      login: '/auth/firebase/login',
      register: '/auth/firebase/register',
      forgot: '/auth/firebase/forgot-password',
    },

  },

  dashboard: {
    index: '/dashboard',
    academy: {
      index: '/dashboard/academy',
      courseDetails: '/dashboard/academy/courses/:courseId',
    },
    account: '/dashboard/account',
    analytics: '/dashboard/analytics',
    blank: '/dashboard/blank',
    capsules: {
      index: '/capsules',
      postDetails: '/capsules/:postId',
      postCreate: '/capsules/create',
    },
    calendar: '/dashboard/calendar',
    chat: '/dashboard/chat',
    crypto: '/dashboard/crypto',
    customers: {
      index: '/dashboard/customers',
      details: '/dashboard/customers/:customerId',
      edit: '/dashboard/customers/:customerId/edit',
    },

    overview: '/dashboard/overview',

    fileManager: '/dashboard/file-manager',
    invoices: {
      index: '/dashboard/invoices',
      details: '/dashboard/invoices/:orderId',
    },


    mail: '/dashboard/mail',
    orders: {
      index: '/dashboard/orders',
      details: '/dashboard/orders/:orderId',
    },



  },
  components: {
    index: '/components',
    dataDisplay: {
      detailLists: '/components/data-display/detail-lists',
      tables: '/components/data-display/tables',
      quickStats: '/components/data-display/quick-stats',
    },
    lists: {
      groupedLists: '/components/lists/grouped-lists',
      gridLists: '/components/lists/grid-lists',
    },
    forms: '/components/forms',
    modals: '/components/modals',
    charts: '/components/charts',
    buttons: '/components/buttons',
    typography: '/components/typography',
    colors: '/components/colors',
    inputs: '/components/inputs',
  },

  notAuthorized: '/401',
  notFound: '/404',
  serverError: '/500',
};
