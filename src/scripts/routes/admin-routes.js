import Dashboard from '../views/pages/admin/dashboard';
import Pengguna from '../views/pages/admin/pengguna';
import Buku from '../views/pages/admin/buku';

const adminRoutes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/pengguna': Pengguna,
  '/buku': Buku,
};

export default adminRoutes;
