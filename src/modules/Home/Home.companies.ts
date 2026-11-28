export interface WorkedWithCompany {
  id: string;
  name: string;
  url: string;
  /** path under /public; left out, the chip shows the initials */
  logo?: string;
}

/** Companies and organisations Syahrul has worked with. */
export const WORKED_WITH: WorkedWithCompany[] = [
  { id: 'anabatic', logo: '/media/companies/anabatic.png', name: 'Anabatic Technologies', url: 'https://anabatic.com' },
  { id: 'its', logo: '/media/companies/its.png', name: 'Institut Teknologi Sepuluh Nopember', url: 'https://www.its.ac.id' },
  { id: 'amar-bank', logo: '/media/companies/amar-bank.png', name: 'Amar Bank', url: 'https://amarbank.co.id' },
  { id: 'halodoc', logo: '/media/companies/halodoc.png', name: 'Halodoc', url: 'https://www.halodoc.com' },
  { id: 'tokopedia', logo: '/media/companies/tokopedia.png', name: 'Tokopedia', url: 'https://www.tokopedia.com' },
  { id: 'bytedance', logo: '/media/companies/bytedance.png', name: 'Bytedance', url: 'https://www.bytedance.com' },
  { id: 'govtech-procurement', logo: '/media/companies/govtech-procurement.png', name: 'Govtech Procurement', url: 'https://www.lkpp.go.id' },
  { id: 'goto', logo: '/media/companies/goto.png', name: 'GoTo Group', url: 'https://www.gotocompany.com' }
];
