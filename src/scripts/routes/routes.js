import Beranda from '../views/pages/beranda';
import Masuk from '../views/pages/masuk';
import Daftar from '../views/pages/daftar';
import Buku from '../views/pages/buku';
import Favorit from '../views/pages/favorit';
import DetailBuku from '../views/pages/detail-buku';

const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/masuk': Masuk,
  '/buku': Buku,
  '/favorit': Favorit,
  '/daftar': Daftar,
  '/detail-buku': DetailBuku,
};

export default routes;
