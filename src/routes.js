import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import LoginForm from './components/LoginForm.vue'
import Correct from './components/Correct.vue'
import CorrectPassword from './components/CorrectPassword.vue'
import NewPassword from './components/NewPassword.vue'
import RestorePassword from './components/RestorePassword.vue'
import PasswordConfirm from './components/PasswordConfirm.vue'
import CreateAccount from './components/CreateAccount.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import OrderTable from './components/views/OrderTable.vue'

import PurchaseOrderShowView from './components/views/purchase-order-show-view.vue'
import PackageShowView from './components/views/package-show-view.vue'
import TrackingOrderShowView from './components/views/tracking-order-show-view.vue'
import TemplateView from './components/views/template-view.vue'

import ShipmentsList from './components/views/shipment-list-view.vue'

import ShipmentsCreateEdit from './components/views/shipment-create-view.vue'
import ShipmentsShow from './components/views/shipment-show-view.vue'
import ShipmentsEvaluatePackage from './components/views/shipment-evaluatePackage-view.vue'

import UserListView from './components/views/userListView.vue'
import ProfileAdmin from './components/views/ProfileAdmin.vue'
import UtilsAdmin from './components/views/UtilsAdmin.vue'
import TableRebate from './components/views/TableRebate.vue'
import EditRebate from './components/views/EditRebate.vue'

import LoginSelection from './components/LoginSelection.vue'
import auth from './middleware/auth'
import noAuth from './middleware/noAuth'
import correctRole from './middleware/correctRole'
import noRecieverOperator from './middleware/noRecieverOperator'
import noClient from './middleware/noClient'
import usersDashboardPermission from './middleware/usersDashboardPermission'
import createBoardingPermission from './middleware/createBoardingPermission';
import manageBoardingPermission from './middleware/manageBoardingPermission';
import evaluateBoardingPermission from './middleware/evaluateBoardingPermission';


// Routes
const routes = [
  {
    path: '/welcome',
    name: 'login-selection',
    component: LoginSelection,
    meta: {
      description: 'Login selection',
      middleware: [noAuth]
    }
  },
  {
    path: '/login/:id',
    name: 'login',
    component: LoginView,
    children: [
      {
        path: '',
        component: LoginForm,
        meta: {
          description: 'Login usuario',
          middleware: [noAuth, correctRole]
        }
      },
      {
        path: 'create',
        component: CreateAccount,
        meta: {
          description: 'Crear cuenta de cliente',
          middleware: [noAuth]
        }
      },
      {
        path: 'correct',
        component: Correct,
        meta: {
          middleware: [noAuth]
        }
      },
      {
        path: 'changepassword',
        component: NewPassword,
        name: 'NewPassword',
        meta: {
          description: 'Restablecer contraseña',
          middleware: [auth]
        }
      },
      {
        path: 'correctpass',
        component: CorrectPassword
      },
      {
        path: 'restorepassword',
        component: RestorePassword
      },
      {
        path: 'confirmpass',
        component: PasswordConfirm
      }
    ],
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',    //Cuando se accede a la ruta '' que es DashView, renderiza el componente DashboardView
        component: DashboardView,
        name: 'Dashboard',
        meta: {
          description: 'Overview of environment',
          middleware: [auth]
        }
      },
      {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {
          description: 'Simple and advance table in CoPilot',
          middleware: [auth]
        }
      },
      {
        path: 'orders',
        component: OrderTable,
        name: 'Orders',
        meta: {
          description: 'Tabla de órdenes de compra',
          middleware: [auth, noRecieverOperator]
        }
      },
      {
        path: 'users',
        component: UserListView,
        name: 'Users',
        meta: {
          description: 'Tabla de usuarios',
          middleware: [auth, usersDashboardPermission]
        }
      },
      {
        path: 'profile',
        component: ProfileAdmin,
        name: 'Profile',
        meta: {
          description: 'Perfil del administrador',
          middleware: [auth ]
        }
      },
      {
        path: 'utils',
        component: UtilsAdmin,
        name: 'Utils',
        meta: {
          description: 'Herramientas para productos de Mercado Libre',
          middleware: [auth, usersDashboardPermission]
        }
      },
      {
        path: 'editRebate/:id/Show',
        component: EditRebate,
        name: 'EditRebate',
        props: true,
        meta: {
          description: 'Editar Rebate',
          middleware: [auth, usersDashboardPermission]
        }
      },
      {
        path: 'tableRebate',
        component: TableRebate,
        name: 'TableRebate',
        meta: {
          description: 'Herramientas para productos de Mercado Libre',
          middleware: [auth, usersDashboardPermission]
        }
      },

      {
        path: 'tasks',
        name: 'add-purchase-order',
        component: TasksView,
        props: true,
        meta: {
          description: 'Tasks page in the form of a timeline',
          middleware: [auth]
        }
      },
      {
        path: 'template',
        name: 'template',
        component: TemplateView,
        props: true,
        meta: {
          description: 'Tracking page in the form of a timeline',
          middleware: [auth]
        }
      },
      {
        path: 'shipments',
        name: 'shipments-list',
        component: ShipmentsList,
        // props: true,
        meta: {
          description: 'List shipments table',
          middleware: [auth, noClient]
        }
      },
      {
        path: 'shipments/create',
        name: 'shipments-create',
        component: ShipmentsCreateEdit,
        props: true,
        meta: {
          description: 'Create shipment section',
          middleware: [auth, createBoardingPermission]
        }
      },
      {
        path: 'shipments/:id/edit',
        name: 'shipments-edit',
        component: ShipmentsCreateEdit,
        props: true,
        meta: {
          description: 'Management shipment section',
          middleware: [auth, manageBoardingPermission]
        }
      },
      {
        path: 'shipments/:id/show',
        name: 'shipments-show',
        component: ShipmentsShow,
        props: true,
        meta: {
          description: 'Show shipment section',
          middleware: [auth]
        }
      },
      {
        path: 'shipments/:id/show/evaluation',
        name: 'shipments-evaluate-package',
        component: ShipmentsEvaluatePackage,
        props: true,
        meta: {
          description: 'evaluate package on shipment section',
          middleware: [auth,evaluateBoardingPermission]
        }
      },
      {
        path: 'purchaseOrder/:id/Show',
        name: 'show-purchase-order',
        component: PurchaseOrderShowView,
        props: true,
        meta: {
          description: 'Show data from purchase order',
          middleware: [auth],

        }
      },

      {
        path: 'package/:id/Show',
        name: 'show-package',
        component: PackageShowView,
        props: true,
        meta: {
          description: 'Show data from purchase order',
          middleware: [auth]
        }
      },
      {
        path: 'trackingOrder/:id/Show',
        name: 'show-tracking-order',
        component: TrackingOrderShowView,
        props: true,
        meta: {
          description: 'Show data from tracking order',
          middleware: [auth]
        }
      },
      {
        path: 'users',
        name: 'user-list',
        component: UserListView,
        props: true,
        meta: {
          description: 'list of users',
          middleware: [auth]
        }
      },
      {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {
          description: 'User settings page',
          middleware: [auth]
        }
      },
      {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {
          description: 'Example of using maps',
          middleware: [auth]
        }
      },
      {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {
          description: 'List of our servers',
          middleware: [auth]
        }
      },
      {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {
          description: 'List of popular javascript repos',
          middleware: [auth]
        }
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

// eslint-disable-next-line eol-last
export default routes
