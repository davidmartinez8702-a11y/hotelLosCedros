import Api from './Api'
import Auth from './Auth'
import AuthController from './AuthController'
import UserController from './UserController'
import ConfiguracionController from './ConfiguracionController'
import CategoriaController from './CategoriaController'
import ServicioController from './ServicioController'
import TipoHabitacionController from './TipoHabitacionController'
import PlatilloController from './PlatilloController'
import BIController from './BIController'
import ReservaController from './ReservaController'
import CheckinController from './CheckinController'
import ClienteController from './ClienteController'
import RecepcionistaController from './RecepcionistaController'
import CuentaController from './CuentaController'
import Settings from './Settings'
import PrediccionController from './PrediccionController'
import ClasificacionClienteController from './ClasificacionClienteController'
import PromoController from './PromoController'
import HabitacionEventoController from './HabitacionEventoController'
import ReservaClienteController from './ReservaClienteController'
const Controllers = {
    Api: Object.assign(Api, Api),
Auth: Object.assign(Auth, Auth),
AuthController: Object.assign(AuthController, AuthController),
UserController: Object.assign(UserController, UserController),
ConfiguracionController: Object.assign(ConfiguracionController, ConfiguracionController),
CategoriaController: Object.assign(CategoriaController, CategoriaController),
ServicioController: Object.assign(ServicioController, ServicioController),
TipoHabitacionController: Object.assign(TipoHabitacionController, TipoHabitacionController),
PlatilloController: Object.assign(PlatilloController, PlatilloController),
BIController: Object.assign(BIController, BIController),
ReservaController: Object.assign(ReservaController, ReservaController),
CheckinController: Object.assign(CheckinController, CheckinController),
ClienteController: Object.assign(ClienteController, ClienteController),
RecepcionistaController: Object.assign(RecepcionistaController, RecepcionistaController),
CuentaController: Object.assign(CuentaController, CuentaController),
Settings: Object.assign(Settings, Settings),
PrediccionController: Object.assign(PrediccionController, PrediccionController),
ClasificacionClienteController: Object.assign(ClasificacionClienteController, ClasificacionClienteController),
PromoController: Object.assign(PromoController, PromoController),
HabitacionEventoController: Object.assign(HabitacionEventoController, HabitacionEventoController),
ReservaClienteController: Object.assign(ReservaClienteController, ReservaClienteController),
}

export default Controllers