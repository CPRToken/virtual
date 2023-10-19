

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
  authDemo: {
    forgotPassword: {
      classic: '/auth-demo/forgot-password/classic',
      modern: '/auth-demo/forgot-password/modern',
    },
    login: {
      classic: '/auth-demo/login/classic',
      modern: '/auth-demo/login/modern',
    },
    register: {
      classic: '/auth-demo/register/classic',
      modern: '/auth-demo/register/modern',
    },
    resetPassword: {
      classic: '/auth-demo/reset-password/classic',
      modern: '/auth-demo/reset-password/modern',
    },
    verifyCode: {
      classic: '/auth-demo/verify-code/classic',
      modern: '/auth-demo/verify-code/modern',
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


      authDemo: {
          forgotPassword: {
              classic: '/auth-demo/forgot-password/classic',
              modern: '/auth-demo/forgot-password/modern',
          },
          login: {
              classic: '/auth-demo/login/classic',
              modern: '/auth-demo/login/modern',
          },
          register: {
              classic: '/auth-demo/register/classic',
              modern: '/auth-demo/register/modern',
          },
          resetPassword: {
              classic: '/auth-demo/reset-password/classic',
              modern: '/auth-demo/reset-password/modern',
          },
          verifyCode: {
              classic: '/auth-demo/verify-code/classic',
              modern: '/auth-demo/verify-code/modern',
          },
      },



    products: {
      index: '/dashboard/products',
      create: '/dashboard/products/create',
    },
    social: {
      index: '/dashboard/social',
      profile: '/[UserUrl}.tsx',
        capsules: '/capsules/index.tsx',
      feed: '/profile/feed',
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
  docs: 'https://material-kit-pro-react-docs.devias.io',
  notAuthorized: '/401',
  notFound: '/404',
  serverError: '/500',
};
