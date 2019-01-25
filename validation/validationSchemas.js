import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçersiz Mail Adresi')
    .required('Mail adresi gerekli'),
  password: Yup.string()
    .min(8, 'Şifreniz en az 8 karakter olmalı')
    .max(20, 'Şifreniz en fazla 20 karakter olmalı')
    .required('Şifre gerekli'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçersiz Mail Adresi')
    .required('Mail adresi gerekli'),
  password: Yup.string()
    .min(8, 'Şifreniz en az 8 karakter olmalı')
    .max(20, 'Şifreniz en fazla 20 karakter olmalı')
    .required('Şifre gerekli'),
});

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçersiz Mail Adresi')
    .required('Mail adresi gerekli'),
});

export const ParticipantSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçersiz Mail Adresi')
    .required('Mail adresi gerekli'),
  name: Yup.string()
    .min(2, 'Adınız sizce de çok kısa değil mi?')
    .max(60, 'Adınızın bu kadar uzun olduğundan emin misiniz?')
    .required('Adınızı yazmadınız'),
  surname: Yup.string()
    .min(1, 'Soyadınız sizce de çok kısa değil mi?')
    .max(40, 'Soyadınızın bu kadar uzun olduğundan emin misiniz?')
    .required('Soyadınızı yazmadınız'),
});
