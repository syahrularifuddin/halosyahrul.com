import createContentLocales from '@/packages/libs/I18n/locales';

const withPortfolioLocales = createContentLocales({
  title: {
    en: 'Portfolio',
    id: 'Portfolio'
  },
  desc: {
    en: 'Things I build and run.',
    id: 'Hal-hal yang saya bangun dan jalankan.'
  },
  weekendTitle: {
    en: 'Personal projects',
    id: 'Proyek pribadi'
  },
  weekendDesc: {
    en: 'Small products, experiments, and deliberate practice beyond the day job.',
    id: 'Produk kecil, eksperimen, dan latihan terarah di luar pekerjaan utama.'
  },
  workTitle: {
    en: 'Professional work',
    id: 'Proyek profesional'
  },
  workDesc: {
    en: 'Products I built for the companies I\'ve worked with.',
    id: 'Produk yang saya bangun untuk perusahaan tempat saya bekerja.'
  }
});

export default withPortfolioLocales;
