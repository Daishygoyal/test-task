import countriesRoutes from './countries.js'
import salesRepRoutes from './salesrep.js'
import optimalRoutes from './optimal.js'

const routesMapping = [
    {path: '/', routes: countriesRoutes},
    {path: '/', routes: salesRepRoutes},
    {path: '/', routes: optimalRoutes},
]

export default routesMapping;
