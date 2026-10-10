// Official company details shown on the trust page, footer and invoices.
// The numbers live in src/data/company.ts. Leave one empty to hide its line.
import { companyRegistration } from '../data/company';

export const company = {
  legalName: { ar: 'شركة أوكسيرا', en: 'Oxira' },
  cr: companyRegistration.crNumber,     // Commercial registration number (السجل التجاري)
  vat: companyRegistration.vatNumber,   // VAT registration number (الرقم الضريبي)
  verifyUrl: companyRegistration.businessPlatformUrl,
};
